"use client";
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

const EditPostForm = ({ post, slug }: { post: Post; slug: string }) => {
  const router = useRouter();

  async function editPostAction(formData: FormData) {
    const response = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title: formData.get("title"),
        content: formData.get("content"),
        published: formData.has("publish"),
      }),
    });
    if (!response.ok) {
      console.error("Failed to edit post");
      return;
    } else {
      router.refresh();
    }
  }
  return (
    <form action={editPostAction}>
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
  );
};

export default EditPostForm;
