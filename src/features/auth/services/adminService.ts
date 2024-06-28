import { db } from "@lib/db";

export async function createAdminIfNotExists(): Promise<number> {
  let admin;
  admin = await db.user.findUnique({
    where: {
      id: parseInt(process.env.ADMIN_ID),
    },
  });

  if (admin) return admin.id;

  admin = await db.user.create({
    data: {
      id: parseInt(process.env.ADMIN_ID),
    },
  });

  return admin.id;
}
