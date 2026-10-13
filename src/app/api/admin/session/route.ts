import { NextResponse } from "next/server";
import {
  createAdminSession,
  discoveryAdminConfigured,
  discoverySessionCookie,
  isSameOriginRequest,
  verifyAdminPassword,
} from "@/lib/discovery-auth";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ success: false, message: "Request origin could not be verified." }, { status: 403 });
  }

  if (!discoveryAdminConfigured()) {
    return NextResponse.json(
      { success: false, message: "Admin sign-in is not configured. Set the required discovery admin environment variables." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Submit a valid sign-in request." }, { status: 400 });
  }

  const password = typeof body === "object" && body !== null && "password" in body
    ? (body as { password?: unknown }).password
    : null;

  if (typeof password !== "string" || password.length > 256 || !verifyAdminPassword(password)) {
    return NextResponse.json({ success: false, message: "Password is incorrect." }, { status: 401 });
  }

  const { token, expiresAt } = createAdminSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(discoverySessionCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(expiresAt * 1000),
  });
  return response;
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ success: false, message: "Request origin could not be verified." }, { status: 403 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(discoverySessionCookie);
  return response;
}
