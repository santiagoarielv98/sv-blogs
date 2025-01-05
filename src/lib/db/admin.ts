"use server";

import { auth } from "@/lib/auth";
import { DEFAULT_SELECT_USER } from "@/lib/db/select";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { generateSlug } from "@/utils/slugify";

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

export const createPost = async (postData: {
  title: string;
  content: string;
  published: boolean;
  tags: string[];
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const { title, content, published, tags } = postData;

  return prisma.post.create({
    include: {
      author: {
        select: DEFAULT_SELECT_USER,
      },
    },
    data: {
      title,
      content,
      authorId: session.user.id,
      slug: await generateUniqueSlug(title),
      published,
      publishedAt: published ? new Date() : null,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { slug: generateSlug(tag) },
          create: { name: tag, slug: generateSlug(tag) },
        })),
      },
    },
  });
};
