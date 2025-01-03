"use client";

import type { Post, Tag, User } from "@prisma/client";
import { useRouter } from "next/navigation";
const EditPostForm = ({
  post,
}: {
  post: Post & { tags: Tag[]; author: User };
}) => {
  const router = useRouter();

  async function editPostAction(formData: FormData) {
    const tags = (formData.get("tags") as string) ?? "";

    const response = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: post.slug,
        title: formData.get("title"),
        content: formData.get("content"),
        published: formData.has("publish"),
        tags: tags
          .split(",")
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 2),
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

      <label>
        Tags:
        <input
          type="text"
          name="tags"
          defaultValue={post.tags.map((tag) => tag.name).join(", ")}
        />
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
