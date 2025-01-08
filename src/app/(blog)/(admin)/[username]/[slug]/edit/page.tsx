import EditPostForm from "@/components/form/edit-post-form";
import { editPost } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug, username } = await params;

  try {
    const post = await editPost(slug, username);

    if (!post) {
      return redirect("/404/post-not-found", RedirectType.replace);
    }

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <EditPostForm post={post} />
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      redirect("/403/unauthorized", RedirectType.replace);
    }
    throw error;
  }
};

export default EditPostPage;
