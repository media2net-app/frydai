export const DEMO_SESSION_COOKIE = "frydai_demo_session";

/** Pre-filled demo credentials (marketing demo only) */
export const DEMO_LOGIN = {
  email: "demo@frydai.ai",
  password: "ShipWork247!",
} as const;

const SESSION_TOKEN = "frydai-demo-authenticated";

export function isValidDemoCredentials(email: string, password: string): boolean {
  const normalized = email.trim().toLowerCase();
  return normalized === DEMO_LOGIN.email && password === DEMO_LOGIN.password;
}

export function isDemoSessionValue(value: string | undefined): boolean {
  return value === SESSION_TOKEN;
}

export function getDemoSessionToken(): string {
  return SESSION_TOKEN;
}

export const demoSessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
