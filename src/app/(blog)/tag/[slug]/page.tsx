import { getFirstPageOfPosts } from "@/actions/post";
import ListPosts from "@/components/list-posts";

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
    <div className="space-y-4">
      <ListPosts posts={posts} nextCursor={nextCursor} config={config} />
    </div>
  );
};

export default TagDetailPage;
