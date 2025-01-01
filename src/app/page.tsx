import { getPosts } from "@/lib/api";

const Home = async () => {
  const posts = await getPosts();
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
