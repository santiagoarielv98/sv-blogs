import { getPosts } from "@/lib/api";
import Link from "next/link";

const Home = async () => {
  const posts = await getPosts();
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p className="line-clamp-2">{post.content}</p>
          <Link href={`/posts/${post.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
