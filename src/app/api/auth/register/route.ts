import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/register-schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log(data);

    const values = await registerSchema.parseAsync(data);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: values.email,
          password: await bcrypt.hash(values.password, 10),
          emailVerified: new Date(),
        },
      });
      await tx.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        },
      });

      return user;
    });
    return Response.json(
      {
        success: true,
      },
      { status: 201, statusText: "Created" },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400, statusText: "Bad Request" },
      );
    }
    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
};
