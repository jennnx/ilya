import { loginArgsSchema } from "../types";
import { type IlyaEndpoint, json } from "@/utils/response";
import { createAdminIfNotExists } from "../services/adminService";
import { validateForm } from "@lib/validation";
import { createAndSetJWTCookie } from "../services/jwtService";
import type { LoginResponse } from "../types";

export const POST: IlyaEndpoint<LoginResponse> = async (context) => {
  const [result, errors] = validateForm(
    await context.request.formData(),
    loginArgsSchema,
  );

  if (errors) {
    const errorMessages = Object.entries(errors.fieldErrors).map(
      ([key, value]) => `Error in field ${key}: ${value.join("\n")}`,
    );
    return json(
      {
        userId: null,
        message: errorMessages.join("\n"),
      },
      { status: 400 },
    );
  }

  const { username, password } = result;
  if (username === "admin" && password === process.env.ADMIN_PASSWORD) {
    const id = await createAdminIfNotExists();

    await createAndSetJWTCookie(id, context);

    return json(
      { userId: id, message: "Successfully logged in" },
      { status: 200 },
    );
  }

  // Unimplemented general auth
  return json(
    { userId: null, message: "Invalid credentials" },
    { status: 401 },
  );
};
