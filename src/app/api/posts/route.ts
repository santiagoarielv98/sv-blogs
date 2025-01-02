import { createPost, updatePost } from "@/lib/api";
import { auth } from "@/lib/auth";

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