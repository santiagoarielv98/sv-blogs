import { getPosts } from "@/lib/api";
import Link from "next/link";

const HomePage = async () => {
  const posts = await getPosts({ take: 10 });

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
          <Link href={`/posts/${post.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
