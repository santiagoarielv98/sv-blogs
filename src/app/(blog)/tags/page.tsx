import { getFirstPageOfTags } from "@/actions/tag";
import ListTags from "@/components/list-tags";

const TagsPage = async () => {
  const { tags, nextCursor } = await getFirstPageOfTags();
  console.log({ tags, nextCursor });

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      <ListTags tags={tags} nextCursor={nextCursor} />
    </div>
  );
};

export default TagsPage;
