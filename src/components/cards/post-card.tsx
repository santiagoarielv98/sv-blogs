import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PostWithAuthorAndTags } from "@/types";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

function PostCard({ post }: { post: PostWithAuthorAndTags }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image ?? undefined} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-sm font-medium hover:underline">
              {post.author.name}
            </h2>
            <div className="flex items-center text-xs text-muted-foreground gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt!).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(post.publishedAt!).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
        <Link href={`/${post.author.username}/${post.slug}`}>
          <h3 className="text-xl font-semibold hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.slug}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
