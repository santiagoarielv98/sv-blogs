"use client";

import { postUpsertAction } from "@/actions/post";
import type { Post, Tag, User } from "@prisma/client";
import { useRouter } from "next/navigation";
const EditPostForm = ({
  post,
}: {
  post: Post & {
    tags: Array<Pick<Tag, "name" | "slug">>;
    author: Pick<User, "name" | "username">;
  };
}) => {
  const router = useRouter();

  async function editPostAction(formData: FormData) {
    const tags = (formData.get("tags") as string) ?? "";

    await postUpsertAction({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      slug: post.slug ?? undefined,
      published: formData.has("publish"),
      tags: tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 2),
    });

    router.refresh();
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
