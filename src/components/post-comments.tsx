"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useComments } from "@/hooks/use-comments";
import { useCommentActions } from "@/hooks/use-comment-actions";
import { useReplyState } from "@/hooks/use-reply-state";
import { CommentItem } from "@/components/comment-item";
import { SkeletonListComments } from "./skeleton-list-comments";

export default function PostComments({ postId }: { readonly postId: string }) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  const { comments, setComments, loading } = useComments(postId);
  const { submitting, addNewComment, replyToExistingComment, removeComment } =
    useCommentActions(postId, comments, setComments);
  const {
    replyingTo,
    replyContent,
    setReplyContent,
    toggleReply,
    cancelReply,
  } = useReplyState();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addNewComment(newComment);
    if (result) {
      setNewComment("");
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    const result = await replyToExistingComment(commentId, replyContent);
    if (result) {
      cancelReply();
    }
  };

  const renderComments = () => {
    if (loading) {
      return <SkeletonListComments />;
    }
    if (comments.length > 0) {
      return comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isReplyOpen={replyingTo === comment.id}
          replyContent={replyContent}
          submitting={submitting}
          onReplyContentChange={setReplyContent}
          onToggleReply={() => toggleReply(comment.id)}
          onCancelReply={cancelReply}
          onSubmitReply={() => handleSubmitReply(comment.id)}
          onDelete={removeComment}
        />
      ));
    }
    return (
      <p className="text-muted-foreground">
        No comments yet. Be the first to comment!
      </p>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Comments</h2>

      {session?.user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="mb-2"
          />
          <Button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="ml-auto"
          >
            Post Comment
          </Button>
        </form>
      ) : (
        <p className="mb-6 text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>{" "}
          to join the conversation.
        </p>
      )}

      {renderComments()}
    </div>
  );
}
