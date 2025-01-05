"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export const register = async (data: {
  email: string;
  username: string;
  name: string;
  password: string;
}) => {
  await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      name: data.name,
      password: await hashPassword(data.password),
    },
  });
};
