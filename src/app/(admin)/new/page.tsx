"use client";

import PostForm from "@/components/form/post-form";
import useCreatePost from "@/hooks/use-create-post";

const NewPostPage = () => {
  const { createPost } = useCreatePost();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <PostForm onSubmit={createPost} />
    </div>
  );
};

export default NewPostPage;
