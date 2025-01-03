import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = async () => {
  const { posts, nextCursor } = await getFirstPageOfPosts();

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Latest Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ListPosts posts={posts} nextCursor={nextCursor} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
