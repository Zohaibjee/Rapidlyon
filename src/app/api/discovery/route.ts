import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { discoverySubmissionSchema } from "@/lib/discovery";
import { getSupabaseServerConfig } from "@/lib/supabase-server";

const maxFileBytes = 5 * 1024 * 1024;
const maxTotalFileBytes = 15 * 1024 * 1024;
const maxFiles = 3;
const allowedFiles = new Map([
  ["application/pdf", "pdf"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

async function removeUploadedFiles(
  config: NonNullable<ReturnType<typeof getSupabaseServerConfig>>,
  paths: string[],
) {
  if (paths.length === 0) return;
  try {
    const response = await fetch(`${config.url}/storage/v1/object/discovery-attachments`, {
    method: "DELETE",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefixes: paths }),
    cache: "no-store",
  });

    if (!response.ok) {
      console.error(`Supabase attachment cleanup failed with status ${response.status}.`);
    }
  } catch (error) {
    console.error("Supabase attachment cleanup request failed.", error);
  }
}

export async function POST(request: Request) {
  const config = getSupabaseServerConfig();
  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: `Discovery submissions are not available until secure storage is configured. Please email ${siteConfig.email}.`,
      },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > maxTotalFileBytes + 1024 * 1024) {
    return NextResponse.json({ success: false, message: "The submission is too large." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ success: false, message: "Please submit a valid discovery form." }, { status: 400 });
  }

  const rawData = form.get("submission");
  if (typeof rawData !== "string") {
    return NextResponse.json({ success: false, message: "Discovery form data is missing." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawData);
  } catch {
    return NextResponse.json({ success: false, message: "Discovery form data is invalid." }, { status: 400 });
  }

  const parsed = discoverySubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message || "Please review your discovery answers." },
      { status: 400 },
    );
  }

  if (form.get("companyWebsite")) {
    return NextResponse.json({ success: false, message: "The request could not be processed. Please contact the studio." }, { status: 400 });
  }

  const files = form.getAll("attachments");
  if (files.length > maxFiles || files.some((file) => !(file instanceof File))) {
    return NextResponse.json({ success: false, message: `Attach up to ${maxFiles} files.` }, { status: 400 });
  }

  let totalBytes = 0;
  for (const file of files as File[]) {
    totalBytes += file.size;
    if (file.size > maxFileBytes || file.size === 0 || !allowedFiles.has(file.type)) {
      return NextResponse.json(
        { success: false, message: "Attachments must be PDF, JPG, PNG, or WebP files under 5 MB each." },
        { status: 400 },
      );
    }
  }

  if (totalBytes > maxTotalFileBytes) {
    return NextResponse.json({ success: false, message: "The combined attachment size must not exceed 15 MB." }, { status: 413 });
  }

  const uploadedPaths: string[] = [];
  try {
    for (const file of files as File[]) {
      const extension = allowedFiles.get(file.type);
      if (!extension) continue;
      const path = `${parsed.data.idempotencyKey}/${randomUUID()}.${extension}`;
      const response = await fetch(`${config.url}/storage/v1/object/discovery-attachments/${path}`, {
        method: "POST",
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
          "Content-Type": file.type,
          "x-upsert": "false",
        },
        body: await file.arrayBuffer(),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(`Supabase discovery attachment upload failed with status ${response.status}.`);
        await removeUploadedFiles(config, uploadedPaths);
        return NextResponse.json(
          { success: false, message: "An attachment could not be uploaded. Please try again or remove it." },
          { status: 502 },
        );
      }

      uploadedPaths.push(path);
    }

    const response = await fetch(
      `${config.url}/rest/v1/discovery_submissions?on_conflict=submission_key`,
      {
        method: "POST",
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify({
          submission_key: parsed.data.idempotencyKey,
          full_name: parsed.data.fullName,
          email: parsed.data.email,
          company: parsed.data.company,
          services: parsed.data.services,
          discovery_method: parsed.data.discoveryMethod,
          preferred_times: parsed.data.preferredTimes || null,
          submission: parsed.data,
          attachment_paths: uploadedPaths,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(`Supabase discovery submission insert failed with status ${response.status}.`);
      await removeUploadedFiles(config, uploadedPaths);
      return NextResponse.json(
        { success: false, message: "We could not save your discovery request. Please try again." },
        { status: 502 },
      );
    }

    const insertedRows: unknown = await response.json();
    if (!Array.isArray(insertedRows) || insertedRows.length === 0) {
      await removeUploadedFiles(config, uploadedPaths);
      return NextResponse.json(
        { success: true, message: "This discovery request has already been received. We’ll be in touch." },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Discovery submission could not be persisted.", error);
    await removeUploadedFiles(config, uploadedPaths);
    return NextResponse.json(
      { success: false, message: `We could not save your discovery request. Please email ${siteConfig.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Your discovery request is saved. We’ll review it and follow up by email.",
    },
    { status: 201 },
  );
}
