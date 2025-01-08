import { prisma } from "@/lib/prisma";
import { generateUsername } from "@/utils/username";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/login-schema";
import { comparePassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: generateUsername(profile.name),
        };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("2-credentials,", credentials);
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
    async jwt({ token, user, account }) {
      if (user && account) {
        // Si es un nuevo usuario de OAuth, asegúrate de que tenga username
        if (account.provider !== "credentials" /* && !user.username */) {
          await prisma.user.update({
            where: { id: user.id },
            data: { username: generateUsername(user.name || "") },
          });
        }
      }
      return token;
    },
  },
});
