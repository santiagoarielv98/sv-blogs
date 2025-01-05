"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const DEFAULT_ARGS: Prisma.TagFindManyArgs = {
  take: 50,
  orderBy: { name: "asc" },
  where: { posts: { some: {} } },
};

export const getFirstPageOfTags = async () => {
  const tags = await prisma.tag.findMany({
    ...DEFAULT_ARGS,
  });

  const nextCursor =
    tags.length > DEFAULT_ARGS.take! ? tags[tags.length - 1].id : null;

  return {
    tags,
    nextCursor,
  };
};

export const getPaginatedTags = async (cursor: string) => {
  const tags = await prisma.tag.findMany({
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
