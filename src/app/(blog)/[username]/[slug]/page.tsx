import PostDetail from "@/components/post-detail";
import { getPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug, username } = await params;
  const post = await getPostBySlug(slug, username);

  if (!post) return notFound();

  return <PostDetail post={post} />;
};

export default DetailPage;
