import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const posts = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    take: 7,
  });

  return Response.json(posts);
};
