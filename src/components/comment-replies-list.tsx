import type { CommentType } from "@/hooks/use-comments";
import { CommentReply } from "@/components/comment-reply";

interface CommentRepliesListProps {
  readonly replies: CommentType[];
  readonly onDelete: (id: string) => void;
}

export function CommentRepliesList({
  replies,
  onDelete,
}: CommentRepliesListProps) {
  if (!replies || replies.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 ml-8 border-l pl-4">
      {replies.map((reply) => (
        <CommentReply key={reply.id} reply={reply} onDelete={onDelete} />
      ))}
    </div>
  );
}
