import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export const getPosts = async () => {
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
    },
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
