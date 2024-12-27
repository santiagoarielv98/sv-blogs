import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email!,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password as string,
          user.password!,
        );

        if (!passwordMatches) {
          throw new Error("Password is not valid");
        }

        return user;
      },
    }),
  ],
});
