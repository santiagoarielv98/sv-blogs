import { getFirstPageOfPosts } from "@/lib/db";
import ListPosts from "@/components/list-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Latest blog posts about web development, technology and programming",
};

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
