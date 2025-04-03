import { useState } from "react";

export function useReplyState() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const startReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyContent("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyContent("");
  };

  const toggleReply = (commentId: string) => {
    if (replyingTo === commentId) {
      cancelReply();
    } else {
      startReply(commentId);
    }
  };

  return {
    replyingTo,
    replyContent,
    setReplyContent,
    startReply,
    cancelReply,
    toggleReply,
  };
}
