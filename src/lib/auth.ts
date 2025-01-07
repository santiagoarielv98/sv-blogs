import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login-schema";
import { comparePassword } from "@/utils/password";
import { generateUsername } from "@/utils/username";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
          username: profile.login || generateUsername(profile.name!),
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
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;

        // Obtener username del usuario
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { username: true },
        });

        if (user) {
          // session.user.username = user.username;
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("jwt", { token, user, account, profile });
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
