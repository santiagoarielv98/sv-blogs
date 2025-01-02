"use client";

import React from "react";

const NewPostPage = () => {
  function createPostAction(formData: FormData) {
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
        published: formData.has("publish"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <h1>New Post</h1>
      <p>This is the new post page.</p>

      <form action={createPostAction}>
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
