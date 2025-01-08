"use server";

import { prisma } from "@/lib/prisma";
import type { RegisterSchema } from "@/schemas/register-schema";
import { hashPassword } from "@/utils/password";

export const register = async (data: RegisterSchema) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    const hasAccountWithEmail = await prisma.account.findFirst({
      where: {
        userId: existingUser.id,
        provider: "email",
      },
    });

    if (hasAccountWithEmail) {
      throw new Error("Email already in use");
    } else {
      await prisma.$transaction([
        prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: "email",
            type: "email",
            providerAccountId: existingUser.id.toString(),
          },
        }),
        prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            password: await hashPassword(data.password),
          },
        }),
      ]);
    }
  } else {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          username: data.username,
          name: data.name,
          password: await hashPassword(data.password),
        },
      });

      await tx.account.create({
        data: {
          userId: user.id,
          provider: "email",
          type: "email",
          providerAccountId: user.id.toString(),
        },
      });

      return user;
    });
  }
};
