import { createPost } from "@/lib/api";
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
