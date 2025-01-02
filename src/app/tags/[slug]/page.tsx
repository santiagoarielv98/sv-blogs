import { getPostsByTag } from "@/lib/api";
import Link from "next/link";

const TagDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug: tagSlug } = await params;

  const posts = await getPostsByTag(tagSlug);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <Link href={`/posts/${post.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default TagDetail;
