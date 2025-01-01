import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/register-schema";
import { hashPassword } from "@/utils/password";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const values = await registerSchema.parseAsync(data);

    await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: await hashPassword(values.password),
        emailVerified: new Date(),
      },
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
