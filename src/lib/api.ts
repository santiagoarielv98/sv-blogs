import { prisma } from "@/lib/prisma";

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};
