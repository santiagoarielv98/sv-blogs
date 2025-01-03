"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const CONFIG: Prisma.PostFindManyArgs = {
  take: 10,
  orderBy: { createdAt: "desc" },
};

export const getFirstPageOfPosts = async () => {
  const posts = await prisma.post.findMany({
    ...CONFIG,
  });

  const nextCursor =
    posts.length > CONFIG.take! ? posts[posts.length - 1].id : null;

  return {
    posts,
    nextCursor,
  };
};

export const getPaginatedPosts = async (cursor: string) => {
  const posts = await prisma.post.findMany({
    ...CONFIG,
    take: CONFIG.take! + 1,
    cursor: { id: cursor },
    skip: 1,
  });

  const hasMore = posts.length > CONFIG.take!;
  if (hasMore) posts.pop();

  return {
    posts,
    nextCursor: hasMore ? posts[posts.length - 1].id : null,
  };
};
