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
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findFirstOrThrow({
            where: {
              email: email,
            },
          });

          const passwordMatches = await bcrypt.compare(
            password,
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
