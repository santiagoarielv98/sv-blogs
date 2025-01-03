"use client";

import { getPaginatedPosts } from "@/actions/post";
import type { Post, Prisma, User, Tag } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostWithAuthorAndTags extends Post {
  tags: Pick<Tag, "id" | "name" | "slug">[];
  author: Pick<User, "username">;
}

interface ListPostsProps {
  posts: PostWithAuthorAndTags[];
  nextCursor: string | null;
  config?: Prisma.PostFindManyArgs;
}

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

export default function ListPosts({
  posts = [],
  nextCursor = null,
  config,
}: ListPostsProps) {
  const [_posts, setPosts] = useState<PostWithAuthorAndTags[]>(posts);
  const [_nextCursor, setNextCursor] = useState<string | null>(nextCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(nextCursor !== null);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const fetchPosts = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { nextCursor, posts } = await getPaginatedPosts(
        _nextCursor!,
        config,
      );

      setPosts((prev) => [...prev, ...posts]);
      setNextCursor(nextCursor);
      setHasMore(nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, _nextCursor, config]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  return (
    <div className="space-y-6">
      {_posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <div ref={ref} className="loading-indicator">
          {loading ? <p>Loading more posts...</p> : null}
        </div>
      )}
      {!hasMore && <p>No more posts to show</p>}
    </div>
  );
}
