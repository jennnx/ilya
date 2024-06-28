import { db } from "@lib/db";
import type { UserCreateArgs } from "./types";
import {
  type Args,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";

const User = db.user;

export async function createUser(args: UserCreateArgs) {
  return User.create({
    data: args,
  });
}

export async function index(args: Args<typeof User, "findMany">) {
  return User.findMany(args);
}
