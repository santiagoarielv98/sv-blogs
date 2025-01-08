import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login-schema";
import { comparePassword } from "@/utils/password";
import { generateUsername } from "@/utils/username";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

class UnregisteredUser extends CredentialsSignin {
  code = "unregistered";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
      allowDangerousEmailAccountLinking: true,
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
});
