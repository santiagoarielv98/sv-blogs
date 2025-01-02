import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { hashPassword } from "@/utils/password";
import { generateSlug } from "@/utils/slugify";

export const getPosts = async (
  paginate: { take?: number; skip?: number } = {},
) => {
  return await prisma.post.findMany({
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
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    ...paginate,
  });
};

export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
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

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
      posts: {
        select: {
          id: true,
          title: true,
          slug: true,
          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};

export const registerUser = async (data: {
  email: string;
  username: string;
  name: string;
  password: string;
}) => {
  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      name: data.name,
      password: await hashPassword(data.password),
    },
  });

  return user;
};

export const getTags = async (
  paginate: { take?: number; skip?: number } = {},
) => {
  return await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
    ...paginate,
  });
};

export const getPostsByTag = async (
  tagSlug: string,
  paginate: { take?: number; skip?: number } = {},
) => {
  return await prisma.post.findMany({
    where: {
      tags: {
        some: {
          slug: tagSlug,
        },
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
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    ...paginate,
  });
};

export const getProfile = async (email?: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      username: true,
    },
  });
};

export async function createPost(postData: {
  title: string;
  content: string;
  authorId: string;
  published?: boolean;
  tags: string[];
}) {
  const { title, content, authorId, published } = postData;
  const slug = await generateUniqueSlug(title);

  return prisma.post.create({
    data: {
      title,
      content,
      authorId,
      slug,
      published,
      publishedAt: published ? new Date() : null,
      tags: {
        connectOrCreate: postData.tags.map((tag) => ({
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
}

export async function updatePost({
  slug,
  title,
  content,
  published,
  authorId,
  tags,
}: {
  slug: string;
  title: string;
  content: string;
  published?: boolean;
  authorId: string;
  tags: string[];
}) {
  return prisma.post.update({
    where: { slug, authorId },
    data: {
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
}
