import { getFirstPageOfTags } from "@/actions/tag";
import ListTags from "@/components/list-tags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TagsPage = async () => {
  const { tags, nextCursor } = await getFirstPageOfTags();

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <ListTags tags={tags} nextCursor={nextCursor} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TagsPage;
