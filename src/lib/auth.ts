import { prisma } from "@/lib/prisma";
import { updateUserFromOAuth } from "@/utils/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized(params) {
      if (params.auth?.user) {
        params.request.auth = params.auth?.user;
      }
      return !!params.auth;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub! || (token.id as string);
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user && account) {
        if (account.provider !== "credentials") {
          await updateUserFromOAuth(user, account, profile);
        }
      }
      return token;
    },
  },
  ...authConfig,
});
