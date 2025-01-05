import PostDetail from "@/components/post-detail";
import { getPostBySlug } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

const DetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}) => {
  const { slug, username } = await params;
  const post = await getPostBySlug(slug, username);

  if (!post) return redirect("/404/post-not-found", RedirectType.replace);

  return <PostDetail post={post} />;
};

export default DetailPage;
