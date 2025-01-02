import { getTags } from "@/lib/api";
import Link from "next/link";

const TagsPage = async () => {
  const tags = await getTags();

  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <div key={tag.id}>
          <h1>{tag.name}</h1>
          <Link href={`/tags/${tag.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default TagsPage;
