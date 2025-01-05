import { getPostBySlug } from "@/actions/post";
import PostDetail from "@/components/post-detail";
import type { PostWithAuthorAndTags } from "@/types";
import { notFound } from "next/navigation";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return <PostDetail post={post as unknown as PostWithAuthorAndTags} />;
};

export default DetailPage;
