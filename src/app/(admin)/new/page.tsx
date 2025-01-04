import PostForm from "@/components/form/post-form";

const NewPostPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default NewPostPage;
