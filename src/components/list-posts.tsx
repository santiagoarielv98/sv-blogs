"use client";

import { getPaginatedPosts } from "@/actions/post";
import type { Post, Prisma, User, Tag } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ListPostsProps {
  posts: Array<
    Post & {
      author: Pick<User, "username">;
      tags: Pick<Tag, "id" | "name" | "slug">[];
    }
  >;
  nextCursor: string | null;
  config?: Prisma.PostFindManyArgs;
}

export default function ListPosts({
  posts = [],
  nextCursor = null,
  config,
}: ListPostsProps) {
  const [_posts, setPosts] = useState<
    Array<
      Post & {
        author: Pick<User, "username">;
        tags: Pick<Tag, "id" | "name" | "slug">[];
      }
    >
  >(posts);
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
    <div className="posts-container">
      {_posts.map((post) => (
        <div key={post.id} className="post bg-gray-100 p-4 mb-4 rounded shadow">
          <Link href={`/${post.author.username}/${post.slug}`}>
            <h2 className="text-lg font-bold">{post.title}</h2>
          </Link>
          <p className="text-sm">{post.content}</p>
          <div className="space-x-2">
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <span className="tag bg-gray-200 p-1 rounded">{tag.name}</span>
              </Link>
            ))}
          </div>
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
