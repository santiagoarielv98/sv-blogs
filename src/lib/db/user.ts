import { prisma } from "@/lib/prisma";
import { DEFAULT_SELECT_USER } from "./select";

export const getProfile = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      username: true,
    },
  });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findFirst({
    where: {
      username,
    },
    select: DEFAULT_SELECT_USER,
  });
};
