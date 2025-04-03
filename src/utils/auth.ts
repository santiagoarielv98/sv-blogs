import { prisma } from "@/lib/prisma";
import { generateUsername } from "./username";
import type { Account, Profile, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

export const updateUserFromOAuth = async (
  user: User | AdapterUser,
  account: Account,
  profile?: Profile,
) => {
  return prisma.user.update({
    where: { id: user.id },
    data: {
      name: user.name ?? profile?.name ?? "",
      image: getAvatar(user, account, profile),
      emailVerified: new Date(),
      username: user.username ?? generateUsername(user.name ?? ""),
    },
  });
};

const getAvatar = (
  user: User | AdapterUser,
  account: Account,
  profile?: Profile,
) => {
  if (user.image) {
    return user.image;
  }
  if (account.provider === "github") {
    return profile?.avatar_url;
  }
  if (account.provider === "google") {
    return profile?.picture;
  }
  return null;
};
