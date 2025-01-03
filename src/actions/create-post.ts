"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { generateSlug } from "@/utils/slugify";

export const createPostAction = async (postData: {
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
  const slug = await generateUniqueSlug(title);

  return prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user.id,
      slug,
      published,
      publishedAt: published ? new Date() : null,
      tags: {
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
          username: true,
        },
      },
    },
  });
};
