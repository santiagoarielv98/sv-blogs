import { getFirstPageOfTags } from "@/actions/tag";
import ListTags from "@/components/list-tags";

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
