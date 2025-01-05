"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import {
  DEFAULT_SELECT_POST,
  DEFAULT_SELECT_TAG,
  DEFAULT_SELECT_USER,
} from "./select";

const DEFAULT_ARGS = {
  take: 10,
  orderBy: { createdAt: "desc" },
  select: {
    ...DEFAULT_SELECT_POST,
    author: {
      select: DEFAULT_SELECT_USER,
    },
    tags: {
      select: DEFAULT_SELECT_TAG,
    },
  },
} as const;

export const getFirstPageOfPosts = async (args?: Prisma.PostFindManyArgs) => {
  const posts = await prisma.post.findMany({
    ...args,
    where: {
      ...args?.where,
      published: true,
    },
    ...DEFAULT_ARGS,
  });

  const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

  return {
    posts,
    nextCursor,
  };
};

export const getPaginatedPosts = async (
  cursor: string,
  args?: Prisma.PostFindManyArgs,
) => {
  const posts = await prisma.post.findMany({
    ...args,
    where: {
      ...args?.where,
      published: true,
    },
    ...DEFAULT_ARGS,
    take: DEFAULT_ARGS.take! + 1,
    cursor: { id: cursor },
    skip: 1,
  });

  const hasMore = posts.length > DEFAULT_ARGS.take!;
  if (hasMore) posts.pop();

  return {
    posts,
    nextCursor: hasMore ? posts[posts.length - 1].id : null,
  };
};
