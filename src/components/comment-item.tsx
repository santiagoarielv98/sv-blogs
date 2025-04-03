import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ReplyIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import type { CommentType } from "@/hooks/use-comments";
import { CommentReplyForm } from "@/components/comment-reply-form";
import { CommentRepliesList } from "@/components/comment-replies-list";

interface CommentItemProps {
  readonly comment: CommentType;
  readonly isReplyOpen: boolean;
  readonly replyContent: string;
  readonly submitting: boolean;
  readonly onReplyContentChange: (content: string) => void;
  readonly onToggleReply: () => void;
  readonly onCancelReply: () => void;
  readonly onSubmitReply: () => void;
  readonly onDelete: (id: string) => void;
}

export function CommentItem({
  comment,
  isReplyOpen,
  replyContent,
  submitting,
  onReplyContentChange,
  onToggleReply,
  onCancelReply,
  onSubmitReply,
  onDelete,
}: CommentItemProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === comment.author.id;

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={comment.author.image ?? undefined}
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
            <Button size="sm" variant="ghost" onClick={onToggleReply}>
              <ReplyIcon className="mr-1 h-4 w-4" />
              Reply
            </Button>
          )}
          {isAuthor && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(comment.id)}
            >
              <TrashIcon className="mr-1 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </CardFooter>

      {isReplyOpen && (
        <CommentReplyForm
          replyContent={replyContent}
          submitting={submitting}
          onReplyContentChange={onReplyContentChange}
          onCancelReply={onCancelReply}
          onSubmitReply={onSubmitReply}
        />
      )}

      <CommentRepliesList replies={comment.replies || []} onDelete={onDelete} />
    </Card>
  );
}
