import { NextResponse } from "next/server";
import {
  demoSessionCookieOptions,
  getDemoSessionToken,
  DEMO_SESSION_COOKIE,
  isValidDemoCredentials,
} from "@/lib/demo-auth";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body.email ?? "";
  const password = body.password ?? "";

  if (!isValidDemoCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(DEMO_SESSION_COOKIE, getDemoSessionToken(), demoSessionCookieOptions);
  return response;
}
