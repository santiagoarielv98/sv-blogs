import { prisma } from "@/lib/prisma";

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findFirst({
    where: {
      slug,
    },
  });
};
