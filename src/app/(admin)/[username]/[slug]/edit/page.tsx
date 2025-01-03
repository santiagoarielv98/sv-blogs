import EditPostForm from "@/components/edit-post-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
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
    <div>
      <h1>Edit Post</h1>
      <p>This is the new post page.</p>
      <EditPostForm post={post} slug={slug} />
    </div>
  );
};

export default EditPostPage;
