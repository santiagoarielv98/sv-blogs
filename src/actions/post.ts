"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { generateSlug } from "@/utils/slugify";
import type { Prisma } from "@prisma/client";

const CONFIG = {
  take: 10,
  orderBy: { createdAt: "desc" },
  include: {
    author: {
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
      },
    },
    tags: {
      select: {
        id: true,
        name: true,
        slug: true,
      },
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
    ...CONFIG,
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
    ...CONFIG,
    where: {
      ...args?.where,
      published: true,
    },
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

export const postUpsertAction = async (postData: {
  title: string;
  content: string;
  published: boolean;
  tags: string[];
  slug?: string;
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const { title, content, published, tags, slug } = postData;
  const uniqueSlug = slug || (await generateUniqueSlug(title));

  return prisma.post.upsert({
    where: { slug: uniqueSlug },
    create: {
      title,
      content,
      authorId: session.user.id,
      slug: uniqueSlug,
      published,
      publishedAt: published ? new Date() : null,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { slug: generateSlug(tag) },
          create: { name: tag, slug: generateSlug(tag) },
        })),
      },
    },
    update: {
      title,
      content,
      published,
      publishedAt: published ? new Date() : null,
      tags: {
        set: [],
        connectOrCreate: tags.map((tag) => ({
          where: { slug: generateSlug(tag) },
          create: { name: tag, slug: generateSlug(tag) },
        })),
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });
};

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
    },
    select: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
};
