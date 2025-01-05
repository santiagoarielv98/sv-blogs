"use client";
import React from "react";
import PostForm from "./post-form";
import type { PostWithTags } from "@/types";
import useEditPost from "@/hooks/use-edit-post";

const EditPostForm = ({ post }: { post: PostWithTags }) => {
  const { editPost } = useEditPost();
  return (
    <PostForm
      initialValues={{
        title: post.title,
        content: post.content,
        tags: post.tags.map((tag) => tag.name).join(", "),
        published: post.published,
      }}
      onSubmit={(data) =>
        editPost({
          id: post.id,
          ...data,
        })
      }
    />
  );
};

export default EditPostForm;
