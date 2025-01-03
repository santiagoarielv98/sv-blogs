import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";

const HomePage = async () => {
  const { posts, nextCursor } = await getFirstPageOfPosts();

  return <ListPosts posts={posts} nextCursor={nextCursor} />;
};

export default HomePage;
