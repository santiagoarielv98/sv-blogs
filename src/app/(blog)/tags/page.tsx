import { getFirstPageOfTags } from "@/actions/tag";
import ListTags from "@/components/list-tags";

const TagsPage = async () => {
  const { tags, nextCursor } = await getFirstPageOfTags();
  console.log({ tags, nextCursor });

  return (
    <div className="space-y-4">
      <ListTags tags={tags} nextCursor={nextCursor} />
    </div>
  );
};

export default TagsPage;
