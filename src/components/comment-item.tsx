import { useSession } from "next-auth/react";
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
import type { CommentType } from "@/hooks/use-comments";

interface CommentItemProps {
  comment: CommentType;
  isReplyOpen: boolean;
  replyContent: string;
  submitting: boolean;
  onReplyContentChange: (content: string) => void;
  onToggleReply: () => void;
  onCancelReply: () => void;
  onSubmitReply: () => void;
  onDelete: (id: string) => void;
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
        <div className="px-4 pb-4">
          <Textarea
            value={replyContent}
            onChange={(e) => onReplyContentChange(e.target.value)}
            placeholder="Write a reply..."
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCancelReply}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={onSubmitReply}
              disabled={submitting || !replyContent.trim()}
            >
              Reply
            </Button>
          </div>
        </div>
      )}

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
                    onClick={() => onDelete(reply.id)}
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
}
