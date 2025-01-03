import { getFirstPageOfTags } from "@/actions/tag";
import ListTags from "@/components/list-tags";

const TagsPage = async () => {
  const { tags, nextCursor } = await getFirstPageOfTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>
      <ListTags tags={tags} nextCursor={nextCursor} />
    </div>
  );
};

export default TagsPage;
