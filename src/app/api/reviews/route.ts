import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { publishedReviewSchema, reviewSchema } from "@/lib/review-validation";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/+$/, ""), serviceRoleKey };
}

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: "Published reviews are unavailable until review storage is configured.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(
      `${config.url}/rest/v1/project_reviews?select=id,name,rating,review,created_at&status=eq.approved&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(`Supabase published-review query failed with status ${response.status}.`);
      return NextResponse.json(
        { success: false, message: "Published reviews could not be loaded right now." },
        { status: 502 },
      );
    }

    const rows: unknown = await response.json();
    const parsedRows = publishedReviewSchema.array().safeParse(rows);

    if (!parsedRows.success) {
      console.error("Supabase returned review records in an unexpected format.");
      return NextResponse.json(
        { success: false, message: "Published reviews could not be loaded right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, reviews: parsedRows.data });
  } catch (error) {
    console.error("Supabase published-review query request failed.", error);
    return NextResponse.json(
      { success: false, message: "Published reviews could not be loaded right now." },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Please submit valid JSON." },
      { status: 400 },
    );
  }

  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues[0]?.message || "Please review your submission.",
      },
      { status: 400 },
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: `Review submissions are not available yet. Please contact ${siteConfig.email}.`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/project_reviews`, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: parsed.data.name,
        rating: parsed.data.rating,
        review: parsed.data.review,
        status: "pending",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Supabase review insert failed with status ${response.status}.`);
      return NextResponse.json(
        { success: false, message: "Your review could not be submitted. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Supabase review insert request failed.", error);
    return NextResponse.json(
      { success: false, message: "The review service could not be reached. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Thank you. Your review was received and will appear after moderation.",
    },
    { status: 201 },
  );
}
