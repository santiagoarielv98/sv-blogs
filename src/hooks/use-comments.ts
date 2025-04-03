import { useState, useEffect } from "react";
import { getCommentsByPostId } from "@/lib/db/comment";
import { useToast } from "@/hooks/use-toast";

export type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
    username: string;
  };
  replies?: CommentType[];
  parentId: string | null;
};

export function useComments(postId: string) {
  const { toast } = useToast();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
        toast({
          title: "Failed to load comments",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, toast]);

  return {
    comments,
    setComments,
    loading,
  };
}
