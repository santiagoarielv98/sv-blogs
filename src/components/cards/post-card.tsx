import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import type { PostWithAuthorAndTags } from "@/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

function PostCard({ post }: { readonly post: PostWithAuthorAndTags }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={post.author.image ?? undefined}
              alt={`Avatar of ${post.author.name}`}
            />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link
              href={`/${post.author.username}`}
              className="text-sm font-medium hover:underline"
            >
              {post.author.name}
            </Link>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <Link href={`/${post.author.username}/${post.slug}`}>
          <h2 className="text-xl font-semibold transition-colors hover:text-primary">
            {post.title}
          </h2>
        </Link>
      </CardHeader>
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
