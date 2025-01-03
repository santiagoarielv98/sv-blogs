"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const CONFIG: Prisma.TagFindManyArgs = {
  take: 50,
  orderBy: { name: "asc" },
};

export const getFirstPageOfTags = async () => {
  const tags = await prisma.tag.findMany({
    ...CONFIG,
  });

  const nextCursor =
    tags.length > CONFIG.take! ? tags[tags.length - 1].id : null;

  return {
    tags,
    nextCursor,
  };
};

export const getPaginatedTags = async (cursor: string) => {
  const tags = await prisma.tag.findMany({
    take: CONFIG.take! + 1,
    cursor: { id: cursor },
    skip: 1,
  });

  const hasMore = tags.length > CONFIG.take!;
  if (hasMore) tags.pop();

  return {
    tags,
    nextCursor: hasMore ? tags[tags.length - 1].id : null,
  };
};
