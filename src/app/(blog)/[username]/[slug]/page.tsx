import PostDetail from "@/components/post-detail";
import { getPostBySlug } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; username: string }>;
}): Promise<Metadata> {
  const { slug, username } = await params;
  const post = await getPostBySlug(slug, username);

  if (!post)
    return {
      title: "Post not found",
    };

  return {
    title: post.title,
    description: `${post.title} - An article by ${username}`,
    // description:
    //   post.description || `${post.title} - An article by ${username}`,
    authors: [{ name: username }],
    openGraph: {
      title: post.title,
      description: `${post.title} - An article by ${username}`,
      // description: post.description,
      type: "article",
      ...(post.publishedAt && {
        publishedTime: post.publishedAt.toISOString(),
      }),
      authors: [username],
    },
  };
}

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
