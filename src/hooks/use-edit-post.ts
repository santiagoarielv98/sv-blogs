import { postUpsertAction } from "@/actions/post";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import type { CreatePostInput } from "@/schemas/post-schema";

const useEditPost = () => {
  const router = useRouter();
  const { toast } = useToast();
  const editPost = async (values: CreatePostInput) => {
    try {
      const post = await postUpsertAction({
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
    editPost,
  };
};

export default useEditPost;
