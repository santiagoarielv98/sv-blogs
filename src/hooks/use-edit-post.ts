import { updatePost } from "@/lib/db";
import type { EditPostInput } from "@/schemas/post-schema";
import { useToast } from "./use-toast";

const useEditPost = () => {
  const { toast } = useToast();

  const onSubmit = async (values: EditPostInput) => {
    try {
      const post = await updatePost({
        ...values,
        tags: values.tags.split(",").map((tag) => tag.trim()),
      });

      toast({
        title: "Success",
        description: "Post edited successfully",
      });

      return post;
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to edit post",
      });
    }
    return null;
  };

  return {
    editPost: onSubmit,
  };
};

export default useEditPost;
