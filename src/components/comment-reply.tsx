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
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import type { CommentType } from "@/hooks/use-comments";

interface CommentReplyProps {
  readonly reply: CommentType;
  readonly onDelete: (id: string) => void;
}

export function CommentReply({ reply, onDelete }: CommentReplyProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === reply.author.id;

  return (
    <Card className="mb-2 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={reply.author.image ?? undefined}
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
        {isAuthor && (
          <Button size="sm" variant="ghost" onClick={() => onDelete(reply.id)}>
            <TrashIcon className="mr-1 h-4 w-4" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
