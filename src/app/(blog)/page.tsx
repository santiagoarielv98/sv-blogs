import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";

const HomePage = async () => {
  const { posts, nextCursor } = await getFirstPageOfPosts();

  return (
    <div className="space-y-4">
      <ListPosts posts={posts} nextCursor={nextCursor} />
    </div>
  );
};

export default HomePage;
