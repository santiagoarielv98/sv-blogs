"use client";

import { getPaginatedPosts } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./cards/post-card";
import type { PostWithAuthorAndTags } from "@/types/post";
import { LoaderCircle } from "lucide-react";

interface ListPostsProps {
  initialState?: {
    posts: PostWithAuthorAndTags[];
    nextCursor: string | null;
  };
  config?: Prisma.PostFindManyArgs;
}

export default function ListPosts({
  initialState: initialData = { posts: [], nextCursor: null },
  config,
}: ListPostsProps) {
  const [posts, setPosts] = useState<PostWithAuthorAndTags[]>(
    initialData.posts,
  );
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialData.nextCursor,
  );
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
      const data = await getPaginatedPosts(nextCursor!, config);

      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor, config]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <div ref={ref} className="flex justify-center">
          {loading ? <LoaderCircle size={32} className="animate-spin" /> : null}
        </div>
      )}
      {!hasMore && <p className="text-center">No more posts to show</p>}
    </div>
  );
}
