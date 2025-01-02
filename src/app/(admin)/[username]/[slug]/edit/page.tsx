import CreatePostForm from "@/components/create-post-form";
import { getPostBySlug } from "@/lib/api";
import type { Post } from "@prisma/client";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = (await getPostBySlug(slug)) as Post | null;

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <p>This is the new post page.</p>
      <CreatePostForm post={post} slug={slug} />
    </div>
  );
};

export default EditPostPage;
