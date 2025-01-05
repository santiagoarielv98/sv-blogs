import { getFirstPageOfPosts } from "@/lib/db";
import ListPosts from "@/components/list-posts";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Posts about ${slug}`,
    description: `Explore all articles related to ${slug}`,
  };
}

const TagDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const config = {
    where: { tags: { some: { slug } } },
  };

  const data = await getFirstPageOfPosts(config);

  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        Posts tagged with <Badge variant="secondary">{slug}</Badge>
      </h1>
      <ListPosts initialState={data} config={config} />
    </div>
  );
};

export default TagDetailPage;
