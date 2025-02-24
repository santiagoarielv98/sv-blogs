import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login-schema";
import { comparePassword } from "@/utils/password";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

class UnregisteredUser extends CredentialsSignin {
  code = "unregistered";
}

export default {
  providers: [
    GithubProvider,
    GoogleProvider,
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = loginSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: email,
            accounts: {
              some: {
                provider: "email",
              },
            },
          },
        });

        if (!user) {
          throw new UnregisteredUser();
        }

        const passwordMatches = await comparePassword(password, user.password!);

        if (!passwordMatches) {
          throw new CredentialsSignin();
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
