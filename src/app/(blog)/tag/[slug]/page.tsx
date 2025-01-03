import Link from "next/link";

const TagDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const posts = [];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <div className="space-x-2">
            {post.tags.map((tag) => (
              <small key={tag.id}>{tag.name}</small>
            ))}
          </div>
          <Link href={`/${post.author.username}/${post.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default TagDetailPage;
