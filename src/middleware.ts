import { JWT_NAME, verify } from "@features/auth/services/jwtService";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const jwt = context.cookies.get(JWT_NAME);
  if (!jwt) {
    context.locals.userId = null;
    return next();
  }

  const userId = await verify(jwt.value);

  if (userId == null) {
    context.locals.userId = null;
    context.cookies.delete(JWT_NAME);
    return next();
  }

  context.locals.userId = userId;
  return next();
});
