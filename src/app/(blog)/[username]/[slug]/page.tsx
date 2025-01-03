import { getPostBySlug } from "@/actions/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const PostDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <article className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.image ?? undefined} />
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
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold">{post.title}</h1>

      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary">
            {tag.name}
          </Badge>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none">{post.content}</div>
    </article>
  );
};

export default PostDetail;
