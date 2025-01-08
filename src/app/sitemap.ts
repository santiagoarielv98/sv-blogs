import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
    take: 1000,
    select: {
      slug: true,
      updatedAt: true,
      author: {
        select: { username: true },
      },
    },
  });

  const postsUrls = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.author.username}/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postsUrls,
  ];
}
