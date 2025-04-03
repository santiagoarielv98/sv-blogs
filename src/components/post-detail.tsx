import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PostComments from "@/components/post-comments";
import type { PostWithAuthorAndTags } from "@/types";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

export interface PostDetailProps {
  post: PostWithAuthorAndTags;
}

const PostDetail = async ({ post }: PostDetailProps) => {
  return (
    <article className="mb-8 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={post.author.image ?? undefined}
            alt={`Avatar of ${post.author.name}`}
          />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <Link
            href={`/${post.author.username}`}
            className="font-medium hover:underline"
          >
            {post.author.name}
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {new Date(post.publishedAt!).toLocaleDateString()}
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold">{post.title}</h1>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary">
            {tag.name}
          </Badge>
        ))}
      </div>
      {/* post.content -> <p>example</p> */}

      <div
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Add comments section */}
      <PostComments postId={post.id} />
    </article>
  );
};

export default PostDetail;
