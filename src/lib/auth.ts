import { prisma } from "@/lib/prisma";
import { generateUsername } from "@/utils/username";
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
          await prisma.user.update({
            where: { id: user.id },
            data: {
              name: user.name || profile?.name || "",
              image: user.image
                ? user.image
                : account.provider === "github"
                  ? profile?.avatar_url
                  : account.provider === "google"
                    ? profile?.picture
                    : null,
              emailVerified: new Date(),
              username: user.username || generateUsername(user.name || ""),
            },
          });
        }
      }
      return token;
    },
  },
  ...authConfig,
});
