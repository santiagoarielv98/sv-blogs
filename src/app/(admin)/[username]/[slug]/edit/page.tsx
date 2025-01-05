import { ErrorScreen } from "@/components/error-screen";
import EditPostForm from "@/components/form/edit-post-form";
import { editPost } from "@/lib/db";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug, username } = await params;

  try {
    const post = await editPost(slug, username);

    if (!post) {
      return notFound();
    }

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <EditPostForm post={post} />
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return (
        <ErrorScreen
          variant="destructive"
          title="Unauthorized Access"
          message="You don't have permission to edit this post."
          status={403}
        />
      );
    }
    throw error;
  }
};

export default EditPostPage;
