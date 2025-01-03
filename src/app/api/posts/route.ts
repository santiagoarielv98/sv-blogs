import { createPost, updatePost } from "@/lib/api";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = parseInt(searchParams.get("take") || "10"); // Número de posts por página
  const cursor = searchParams.get("cursor"); // Cursor actual (ID del último post)

  try {
    const posts = await prisma.post.findMany({
      take: take + 1, // Pedimos uno más para determinar si hay más
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0, // Evita incluir el registro del cursor actual
      orderBy: { createdAt: "desc" },
    });

    // Determina si hay más datos
    const hasMore = posts.length > take;
    if (hasMore) posts.pop(); // Elimina el registro extra si hay más datos

    return NextResponse.json({
      posts,
      nextCursor: hasMore ? posts[posts.length - 1].id : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export const POST = async (req: Request) => {
  const [data, session] = await Promise.all([req.json(), auth()]);

  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const post = await createPost({
    ...data,
    authorId: session.user.id,
  });

  return Response.json(post);
};

export const PUT = async (req: Request) => {
  const [data, session] = await Promise.all([req.json(), auth()]);

  if (!session?.user?.id) {
    return new Response(null, { status: 401 });
  }

  const post = await updatePost({
    slug: data.slug,
    title: data.title,
    content: data.content,
    published: data.published,
    authorId: session.user.id,
    tags: data.tags,
  });

  return Response.json(post);
};
