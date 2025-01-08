"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema, type RegisterSchema } from "@/schemas/register-schema";
import { hashPassword } from "@/utils/password";
import { ZodError } from "zod";

type RegisterResponse = {
  success: boolean;
  errors?: {
    email?: string[];
    username?: string[];
    name?: string[];
    password?: string[];
    root?: string[];
  };
};

export const register = async (
  credentials: RegisterSchema,
): Promise<RegisterResponse> => {
  try {
    const data = registerSchema.parse(credentials);

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
        return {
          success: false,
          errors: {
            email: ["This email is already registered"],
          },
        };
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
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: RegisterResponse["errors"] = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as keyof RegisterSchema;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path]?.push(err.message);
      });
      return { success: false, errors };
    }

    return {
      success: false,
      errors: {
        root: ["Something went wrong. Please try again later."],
      },
    };
  }
};
