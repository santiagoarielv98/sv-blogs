"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function getPaginatedAdminPosts(page = 1) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        authorId: session.user.id,
      },
      include: {
        tags: true,
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.post.count({
      where: {
        authorId: session.user.id,
      },
    }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
  };
}

export async function deletePost(postId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.post.delete({
    where: {
      id: postId,
      authorId: session.user.id,
    },
  });
}

export async function togglePublishPost(postId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { published: true },
  });

  return prisma.post.update({
    where: {
      id: postId,
      authorId: session.user.id,
    },
    data: {
      published: !post?.published,
      publishedAt: !post?.published ? new Date() : null,
    },
  });
}
