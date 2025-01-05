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
        tags: post.tags.join(", "),
        published: post.published,
      }}
      onSubmit={editPost}
    />
  );
};

export default EditPostForm;
