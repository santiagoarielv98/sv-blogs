"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SELECT_USER } from "./select";

const DEFAULT_SELECT_COMMENT = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  parentId: true,
  postId: true,
  authorId: true,
};

export const addComment = async (postId: string, content: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to comment");
  }

  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
    },
    select: {
      ...DEFAULT_SELECT_COMMENT,
      author: {
        select: DEFAULT_SELECT_USER,
      },
    },
  });
};

export const replyToComment = async (
  commentId: string,
  postId: string,
  content: string,
) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to reply");
  }

  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
      parentId: commentId,
    },
    select: {
      ...DEFAULT_SELECT_COMMENT,
      author: {
        select: DEFAULT_SELECT_USER,
      },
    },

    
  });
};

export const getCommentsByPostId = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      ...DEFAULT_SELECT_COMMENT,
      author: {
        select: DEFAULT_SELECT_USER,
      },
      replies: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          ...DEFAULT_SELECT_COMMENT,
          author: {
            select: DEFAULT_SELECT_USER,
          },
        },
      },
    },
  });

  return comments;
};

export const getCommentById = async (commentId: string) => {
  return prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      ...DEFAULT_SELECT_COMMENT,
      author: {
        select: DEFAULT_SELECT_USER,
      },
      replies: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          ...DEFAULT_SELECT_COMMENT,
          author: {
            select: DEFAULT_SELECT_USER,
          },
        },
      },
    },
  });
};

export const deleteComment = async (commentId: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a comment");
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      authorId: true,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.authorId !== session.user.id) {
    throw new Error("You can only delete your own comments");
  }

  return prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};
