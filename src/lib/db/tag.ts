"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const TAGS_PER_PAGE = 50;

const DEFAULT_ARGS: Prisma.TagFindManyArgs = {
  take: TAGS_PER_PAGE,
  orderBy: { name: "asc" },
  where: { posts: { some: {} } },
  include: {
    _count: {
      select: { posts: true },
    },
  },
};

export const getFirstPageOfTags = async () => {
  const tags = await prisma.tag.findMany({
    ...DEFAULT_ARGS,
  });

  const nextCursor =
    tags.length > TAGS_PER_PAGE - 1 ? tags[tags.length - 1].id : null;

  return {
    tags,
    nextCursor,
  };
};

export const getPaginatedTags = async (cursor: string) => {
  const tags = await prisma.tag.findMany({
    ...DEFAULT_ARGS,
    take: DEFAULT_ARGS.take! + 1,
    cursor: { id: cursor },
    skip: 1,
  });

  const hasMore = tags.length > DEFAULT_ARGS.take!;
  if (hasMore) tags.pop();

  return {
    tags,
    nextCursor: hasMore ? tags[tags.length - 1].id : null,
  };
};

export const searchTags = async (query: string) => {
  if (!query) return [];

  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: query.toLowerCase(),
        mode: "insensitive",
      },
    },
    take: 10,
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    select: {
      name: true,
      slug: true,
    },
  });

  return tags;
};
