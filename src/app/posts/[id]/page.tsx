import { getPost } from "@/lib/api";
import { notFound } from "next/navigation";

const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
