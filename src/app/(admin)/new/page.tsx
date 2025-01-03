"use client";

import { postUpsertAction } from "@/actions/post";
import { useRouter } from "next/navigation";

const NewPostPage = () => {
  const router = useRouter();

  async function action(formData: FormData) {
    const tags = (formData.get("tags") as string) ?? "";
    const post = await postUpsertAction({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tags: tags.split(",").map((tag) => tag.trim()),
      published: formData.has("publish"),
    });

    router.replace(`/${post.author.username}/${post.slug}/edit`);
  }

  return (
    <div>
      <h1>New Post</h1>
      <p>This is the new post page.</p>

      <form action={action}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>

        <br />

        <label>
          Content:
          <textarea name="content" />
        </label>

        <br />

        <label>
          Tags:
          <input type="text" name="tags" />
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

export default NewPostPage;
