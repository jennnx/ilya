import { z } from "zod";

export const loginArgsSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
});

export type LoginArgs = z.infer<typeof loginArgsSchema>;

export const loginResponseSchema = z.object({
  userId: z.number().nullable(),
  message: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
