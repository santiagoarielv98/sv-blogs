import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentReplyFormProps {
  replyContent: string;
  submitting: boolean;
  onReplyContentChange: (content: string) => void;
  onCancelReply: () => void;
  onSubmitReply: () => void;
}

export function CommentReplyForm({
  replyContent,
  submitting,
  onReplyContentChange,
  onCancelReply,
  onSubmitReply,
}: CommentReplyFormProps) {
  return (
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
  );
}
