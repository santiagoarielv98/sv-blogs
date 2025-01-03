import { prisma } from "@/lib/prisma";

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
};
