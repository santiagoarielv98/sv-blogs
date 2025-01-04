import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";

const HomePage = async () => {
  const data = await getFirstPageOfPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Posts</h1>
      <ListPosts initialState={data} />
    </div>
  );
};

export default HomePage;
