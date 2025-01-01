import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login-schema";
import { comparePassword } from "@/utils/password";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
          const { email, password } = loginSchema.parse(credentials);

          const user = await prisma.user.findFirstOrThrow({
            where: {
              email: email,
            },
          });

          const passwordMatches = await comparePassword(
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
