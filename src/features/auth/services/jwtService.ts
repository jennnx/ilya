import * as jose from "jose";
import type { APIContext } from "astro";

export const JWT_NAME = "ilya_jwt";
const alg = "HS256" as const;

export async function signSub(id: number) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const jwt = await new jose.SignJWT()
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setSubject(id.toString())
    .setExpirationTime("90d")
    .sign(secret);

  return jwt;
}

export async function verify(jwt: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    if (!payload?.sub) return null;
    const userId = parseInt(payload.sub);
    if (isNaN(userId)) return null;
    return userId;
  } catch (e) {
    return null;
  }
}

export async function setJWTCookie(jwt: string, context: APIContext) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 90);

  context.cookies.set(JWT_NAME, jwt, {
    expires,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    path: "/",
  });
}

export async function createAndSetJWTCookie(id: number, context: APIContext) {
  const jwt = await signSub(id);
  await setJWTCookie(jwt, context);
}
