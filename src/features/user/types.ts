import { type User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;

export type UserCreateArgs = Omit<User, never>;
