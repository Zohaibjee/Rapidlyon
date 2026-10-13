import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { siteConfig } from "@/data/site";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Please submit valid JSON.",
      },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues[0]?.message || "Please review your form inputs.",
      },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        success: false,
        message: `This inquiry was not sent because secure database storage is not configured. Please email ${siteConfig.email} instead.`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/inquiries`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        service: parsed.data.service,
        project_description: parsed.data.projectDescription,
        budget: parsed.data.budget || null,
        timeline: parsed.data.timeline || null,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Supabase inquiry insert failed with status ${response.status}.`);
      return NextResponse.json(
        {
          success: false,
          message: `We could not save your inquiry. Please try again or email ${siteConfig.email}.`,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Supabase inquiry insert request failed.", error);
    return NextResponse.json(
      {
        success: false,
        message: `We could not reach the inquiry service. Please try again or email ${siteConfig.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Your inquiry was saved successfully. We’ll follow up soon.",
    },
    { status: 201 },
  );
}
