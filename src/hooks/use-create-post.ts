import { createPost } from "@/lib/db/admin";
import type { CreatePostInput } from "@/schemas/post-schema";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const useCreatePost = () => {
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: CreatePostInput) => {
    try {
      const post = await createPost({
        ...values,
        tags: values.tags.split(",").map((tag) => tag.trim()),
      });

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      router.replace(`/${post.author.username}/${post.slug}/edit`);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post",
      });
    }
  };

  return {
    createPost: onSubmit,
  };
};

export default useCreatePost;
