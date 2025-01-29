"use server";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import {
  DEFAULT_SELECT_POST,
  DEFAULT_SELECT_TAG,
  DEFAULT_SELECT_USER,
} from "./select";

const POSTS_PER_PAGE = 10;

const DEFAULT_ARGS = {
  take: POSTS_PER_PAGE,
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

export const getFirstPageOfPosts = async (
  args?: Prisma.PostFindManyArgs,
  search?: string,
  tags?: string[],
) => {
  const posts = await prisma.post.findMany({
    ...args,
    where: {
      ...args?.where,
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(tags?.length && {
        tags: {
          some: {
            slug: {
              in: tags,
            },
          },
        },
      }),
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
  search?: string,
  tags?: string[],
) => {
  const posts = await prisma.post.findMany({
    ...args,
    where: {
      ...args?.where,
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(tags?.length && {
        tags: {
          some: {
            slug: {
              in: tags,
            },
          },
        },
      }),
    },
    ...DEFAULT_ARGS,
    take: POSTS_PER_PAGE + 1,
    cursor: { id: cursor },
    skip: 1,
  });

  const hasMore = posts.length > POSTS_PER_PAGE;
  if (hasMore) posts.pop();

  return {
    posts,
    nextCursor: hasMore ? posts[posts.length - 1].id : null,
  };
};

export const getPostBySlug = async (slug: string, username: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
      author: {
        username,
      },
    },
    select: {
      ...DEFAULT_SELECT_POST,
      author: {
        select: DEFAULT_SELECT_USER,
      },
      tags: {
        select: DEFAULT_SELECT_TAG,
      },
    },
  });
};

export const getPublishedTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
    select: DEFAULT_SELECT_TAG,
    orderBy: {
      name: "asc",
    },
  });

  return tags;
};
