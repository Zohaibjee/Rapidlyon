import { NextResponse } from "next/server";
import { z } from "zod";
import { isDiscoveryAdmin, isSameOriginRequest } from "@/lib/discovery-auth";

const idSchema = z.string().uuid();
const attachmentSchema = z.object({
  path: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(pdf|jpg|png|webp)$/i,
  ),
});

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && serviceRoleKey
    ? { url: url.replace(/\/+$/, ""), serviceRoleKey }
    : null;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ success: false, message: "Request origin could not be verified." }, { status: 403 });
  }
  if (!(await isDiscoveryAdmin())) {
    return NextResponse.json({ success: false, message: "Sign in to access attachments." }, { status: 401 });
  }

  const { id } = await params;
  if (!idSchema.safeParse(id).success) {
    return NextResponse.json({ success: false, message: "Invalid submission ID." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Submit a valid attachment request." }, { status: 400 });
  }
  const parsed = attachmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Invalid attachment path." }, { status: 400 });
  }

  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ success: false, message: "Supabase storage is not configured." }, { status: 503 });
  }

  try {
    const rowResponse = await fetch(
      `${config.url}/rest/v1/discovery_submissions?id=eq.${id}&select=attachment_paths`,
      {
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
        },
        cache: "no-store",
      },
    );
    if (!rowResponse.ok) {
      console.error(`Supabase attachment ownership check failed with status ${rowResponse.status}.`);
      return NextResponse.json({ success: false, message: "Attachment could not be accessed." }, { status: 502 });
    }
    const rows = await rowResponse.json();
    if (!Array.isArray(rows) || !Array.isArray(rows[0]?.attachment_paths) || !rows[0].attachment_paths.includes(parsed.data.path)) {
      return NextResponse.json({ success: false, message: "Attachment not found for this submission." }, { status: 404 });
    }

    const signResponse = await fetch(
      `${config.url}/storage/v1/object/sign/discovery-attachments/${parsed.data.path.split("/").map(encodeURIComponent).join("/")}`,
      {
        method: "POST",
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expiresIn: 300 }),
        cache: "no-store",
      },
    );
    if (!signResponse.ok) {
      console.error(`Supabase signed attachment URL request failed with status ${signResponse.status}.`);
      return NextResponse.json({ success: false, message: "Attachment could not be accessed." }, { status: 502 });
    }

    const signed = await signResponse.json();
    const signedUrl = typeof signed.signedURL === "string"
      ? (signed.signedURL.startsWith("/object/")
        ? `${config.url}/storage/v1${signed.signedURL}`
        : new URL(signed.signedURL, `${config.url}/storage/v1/`).toString())
      : null;
    if (!signedUrl || new URL(signedUrl).origin !== new URL(config.url).origin) {
      console.error("Supabase returned an invalid signed attachment URL.");
      return NextResponse.json({ success: false, message: "Attachment could not be accessed." }, { status: 502 });
    }

    return NextResponse.json({ success: true, url: signedUrl });
  } catch (error) {
    console.error("Supabase signed attachment request failed.", error);
    return NextResponse.json({ success: false, message: "Attachment could not be accessed." }, { status: 502 });
  }
}
