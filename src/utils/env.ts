import { z } from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  PORT: z.string().default("3000").readonly(),
  NODE_ENV: z.string().min(1).readonly(),
  DATABASE_URL: z.string().min(1).readonly(),
  RUNPOD_URL: z.string().min(1).readonly(),
  RUNPOD_API_KEY: z.string().min(1).readonly(),
  RUNPOD_APP_SECRET: z.string().min(1).readonly(),
  ADMIN_PASSWORD: z.string().min(1).readonly(),
  ADMIN_ID: z.coerce.number().int().readonly(),
  AUTH_SECRET: z.string().min(1).readonly(),
});

export type Env = z.infer<typeof envSchema> & { ADMIN_ID: string };

export const initEnv = (): void => {
  configDotenv();
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    const errors = parsedEnv.error.flatten();
    throw new Error(
      `Environment validation failed on startup:\n${JSON.stringify(errors, null, 2)}`,
    );
  }
};
