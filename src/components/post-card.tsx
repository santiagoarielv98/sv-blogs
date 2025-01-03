import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PostWithAuthorAndTags } from "@/types";

import Link from "next/link";

function PostCard({ post }: { post: PostWithAuthorAndTags }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="line-clamp-2">{post.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-4">{post.content}</p>
      </CardContent>
      <CardFooter className="justify-between gap-4">
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.slug}`}>
              <Badge variant="secondary">{tag.name}</Badge>
            </Link>
          ))}
        </div>
        <small className="text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </small>
      </CardFooter>
    </Card>
  );
}

export default PostCard;