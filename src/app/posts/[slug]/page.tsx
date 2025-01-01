import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

const PostDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  console.log(post);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <small>By {post.author.name}</small>
      </p>
    </div>
  );
};

export default PostDetail;
