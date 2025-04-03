"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  addComment,
  replyToComment,
  getCommentsByPostId,
  deleteComment,
} from "@/lib/db/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ReplyIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type CommentType = {
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

export default function PostComments({ postId }: { postId: string }) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Fetch comments when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
        // toast.error("Failed to load comments");
        toast({
          title: "Failed to load comments",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  // Handle submitting a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const comment = await addComment(postId, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
      //   toast.success("Comment added successfully");
      toast({
        title: "Comment added successfully",
        description: "Your comment has been posted.",
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
      //   toast.error("Failed to add comment");
      toast({
        title: "Failed to add comment",
        description: "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle submitting a reply to a comment
  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      const reply = await replyToComment(commentId, postId, replyContent);

      // Update the comments state with the new reply
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

      setReplyingTo(null);
      setReplyContent("");
      //   toast.success("Reply added successfully");
      toast({
        title: "Reply added successfully",
        description: "Your reply has been posted.",
      });
    } catch (error) {
      console.error("Failed to add reply:", error);
      //   toast.error("Failed to add reply");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(commentId);

      // Remove the comment from state
      setComments(
        comments.filter((comment) => {
          // Remove if it's a top-level comment
          if (comment.id === commentId) return false;

          // Remove from replies if it's a reply
          if (comment.replies) {
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== commentId,
            );
          }
          return true;
        }),
      );

      //   toast.success("Comment deleted successfully");
      toast({
        title: "Comment deleted successfully",
        description: "The comment has been removed.",
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      //   toast.error("Failed to delete comment");
      toast({
        title: "Failed to delete comment",
        description: "Please try again later.",
      });
    }
  };

  // Render a single comment
  const renderComment = (comment: CommentType) => {
    const isAuthor = session?.user?.id === comment.author.id;
    const isReplyOpen = replyingTo === comment.id;

    return (
      <Card key={comment.id} className="mb-4">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment.author.image || undefined}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/${comment.author.username}`}
              className="font-medium hover:underline"
            >
              {comment.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{comment.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex gap-2">
            {session?.user && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setReplyingTo(isReplyOpen ? null : comment.id);
                  setReplyContent("");
                }}
              >
                <ReplyIcon className="mr-1 h-4 w-4" />
                Reply
              </Button>
            )}
            {isAuthor && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <TrashIcon className="mr-1 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </CardFooter>

        {isReplyOpen && (
          <div className="px-4 pb-4">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={submitting || !replyContent.trim()}
              >
                Reply
              </Button>
            </div>
          </div>
        )}

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mb-4 ml-8 border-l pl-4">
            {comment.replies.map((reply) => (
              <Card key={reply.id} className="mb-2 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={reply.author.image || undefined}
                      alt={reply.author.name}
                    />
                    <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link
                      href={`/${reply.author.username}`}
                      className="font-medium hover:underline"
                    >
                      {reply.author.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(reply.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{reply.content}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  {session?.user?.id === reply.author.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteComment(reply.id)}
                    >
                      <TrashIcon className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Comments</h2>

      {/* Comment form */}
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

      {/* Loading state */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-md bg-muted"></div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        comments.map(renderComment)
      ) : (
        <p className="text-muted-foreground">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}
