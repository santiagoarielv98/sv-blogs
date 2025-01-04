import PostForm from "@/components/form/post-form";
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
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
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
      <PostForm initialValues={post} />
    </div>
  );
};

export default EditPostPage;
