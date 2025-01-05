import EditPostForm from "@/components/form/edit-post-form";
import { editPost } from "@/lib/db";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug } = await params;

  const post = await editPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
};

export default EditPostPage;
