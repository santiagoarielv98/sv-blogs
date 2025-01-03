"use client";

import { getPaginatedPosts } from "@/actions/post";
import type { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./post-card";
import type { PostWithAuthorAndTags } from "@/types/post";

interface ListPostsProps {
  posts: PostWithAuthorAndTags[];
  nextCursor: string | null;
  config?: Prisma.PostFindManyArgs;
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
