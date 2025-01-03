import { prisma } from "@/lib/prisma";

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
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
      posts: {
        select: {
          id: true,
          title: true,
          slug: true,
          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};
