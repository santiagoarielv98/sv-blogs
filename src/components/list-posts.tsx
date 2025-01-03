"use client";

import type { Post } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ListPostsProps {
  posts: Post[];
  nextCursor: string | null;
}

export default function ListPosts({
  posts = [],
  nextCursor = null,
}: ListPostsProps) {
  const [_posts, setPosts] = useState<Post[]>(posts);
  const [_nextCursor, setNextCursor] = useState<string | null>(nextCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const fetchPosts = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts?take=10&cursor=${_nextCursor || ""}`);
      const data = await res.json();

      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, _nextCursor]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  useEffect(() => {
    console.log(
      "posts",
      posts.map((post) => post.id),
    );
  }, [posts]);

  return (
    <div className="posts-container">
      {_posts.map((post) => (
        <div key={post.id} className="post bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-bold">{post.title}</h2>
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
