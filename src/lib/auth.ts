import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas/login-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { data, error } = await loginSchema.safeParseAsync(credentials);

          if (error) {
            throw new Error(error.errors.join(", "));
          }

          const user = await prisma.user.findFirst({
            where: {
              email: data.email,
            },
          });

          if (!user) {
            throw new Error("No user found");
          }

          const passwordMatches = await bcrypt.compare(
            data.password,
            user.password!,
          );

          if (!passwordMatches) {
            throw new Error("Password is not valid");
          }

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
  },
});
