import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addComment, replyToComment, deleteComment } from "@/lib/db/comment";
import type { CommentType } from "@/hooks/use-comments";

export function useCommentActions(
  postId: string,
  comments: CommentType[],
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const addNewComment = async (content: string) => {
    if (!content.trim()) return null;

    try {
      setSubmitting(true);
      const comment = await addComment(postId, content);
      setComments([comment, ...comments]);

      toast({
        title: "Comment added successfully",
        description: "Your comment has been posted.",
      });

      return comment;
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast({
        title: "Failed to add comment",
        description: "Please try again later.",
      });
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const replyToExistingComment = async (commentId: string, content: string) => {
    if (!content.trim()) return null;

    try {
      setSubmitting(true);
      const reply = await replyToComment(commentId, postId, content);

      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        }),
      );

      toast({
        title: "Reply added successfully",
        description: "Your reply has been posted.",
      });

      return reply;
    } catch (error) {
      console.error("Failed to add reply:", error);
      toast({
        title: "Failed to add reply",
        description: "Please try again later.",
      });
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const removeComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return false;

    try {
      await deleteComment(commentId);

      setComments(
        comments.filter((comment) => {
          if (comment.id === commentId) return false;

          if (comment.replies) {
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== commentId,
            );
          }
          return true;
        }),
      );

      toast({
        title: "Comment deleted successfully",
        description: "The comment has been removed.",
      });

      return true;
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast({
        title: "Failed to delete comment",
        description: "Please try again later.",
      });
      return false;
    }
  };

  return {
    submitting,
    addNewComment,
    replyToExistingComment,
    removeComment,
  };
}
