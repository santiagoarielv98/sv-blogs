import EditPostForm from "@/components/form/edit-post-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug, username } = await params;

  const post = await prisma.post.findFirst({
    where: {
      slug,
      author: {
        username,
      },
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

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
