import { getPostBySlug } from "@/actions/post";
import Link from "next/link";
import { notFound } from "next/navigation";

const PostDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <small>
          By <Link href={`/${post.author.username}`}>{post.author.name}</Link>
        </small>
      </p>
    </div>
  );
};

export default PostDetail;
