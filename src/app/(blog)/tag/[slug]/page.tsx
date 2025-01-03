import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        Posts tagged with <Badge variant="secondary">{slug}</Badge>
      </h1>
      <ListPosts posts={posts} nextCursor={nextCursor} config={config} />
    </div>
  );
};

export default TagDetailPage;
