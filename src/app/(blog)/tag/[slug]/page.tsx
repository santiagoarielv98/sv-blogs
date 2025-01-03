import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TagDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const config = {
    where: { tags: { some: { slug } } },
  };

  const { posts, nextCursor } = await getFirstPageOfPosts(config);

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            Posts tagged with <Badge variant="secondary">{slug}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ListPosts posts={posts} nextCursor={nextCursor} config={config} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TagDetailPage;
