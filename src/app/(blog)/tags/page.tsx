import { getFirstPageOfTags } from "@/lib/db/tag";
import ListTags from "@/components/list-tags";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Tags",
  description: "Explore all available topics and categories in the blog",
};

const TagsPage = async () => {
  const data = await getFirstPageOfTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>
      <ListTags initialState={data} />
    </div>
  );
};

export default TagsPage;
