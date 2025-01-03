"use client";

import { getPaginatedPosts } from "@/actions/post";
import type { Post, User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ListPostsProps {
  posts: Array<Post & { author: Pick<User, "username"> }>;
  nextCursor: string | null;
}

export default function ListPosts({
  posts = [],
  nextCursor = null,
}: ListPostsProps) {
  const [_posts, setPosts] =
    useState<Array<Post & { author: Pick<User, "username"> }>>(posts);
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
      const { nextCursor, posts } = await getPaginatedPosts(_nextCursor!);

      setPosts((prev) => [...prev, ...posts]);
      setNextCursor(nextCursor);
      setHasMore(nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, _nextCursor]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  return (
    <div className="posts-container">
      {_posts.map((post) => (
        <div key={post.id} className="post bg-gray-100 p-4 mb-4 rounded shadow">
          <Link href={`/${post.author.username}/${post.slug}`}>
            <h2 className="text-lg font-bold">{post.title}</h2>
          </Link>
          <p className="text-sm">{post.content}</p>
          <small className="text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
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
