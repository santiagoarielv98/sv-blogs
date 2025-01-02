import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <p>This is the new post page.</p>

      <form>
        <label>
          Title:
          <input type="text" name="title" defaultValue={post.title} />
        </label>

        <br />

        <label>
          Content:
          <textarea name="content" defaultValue={post.content} />
        </label>

        <br />

        <button>Save</button>

        <br />

        <button type="submit" name="publish" value="true">
          Publish
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
