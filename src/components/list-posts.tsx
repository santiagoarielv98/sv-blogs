"use client";

import { getFirstPageOfPosts, getPaginatedPosts } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./cards/post-card";
import type { PostWithAuthorAndTags } from "@/types/post";
import { LoaderCircle } from "lucide-react";
import SearchBar from "./search-bar";

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
  const [searchTerm, setSearchTerm] = useState("");

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setLoading(true);
    const data = await getFirstPageOfPosts(config, term);
    setPosts(data.posts);
    setNextCursor(data.nextCursor);
    setHasMore(data.nextCursor !== null);
    setLoading(false);
  };

  const fetchPosts = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getPaginatedPosts(nextCursor!, config, searchTerm);
      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor, config, searchTerm]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} />

      <div className="space-y-6" aria-busy={loading} aria-label="Posts list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {hasMore && (
          <div
            ref={ref}
            className="flex justify-center"
            role="status"
            aria-label="Loading more posts"
          >
            {loading ? (
              <LoaderCircle
                size={32}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : null}
          </div>
        )}
        {!hasMore && (
          <p className="text-center" role="status">
            No more posts to show
          </p>
        )}
      </div>
    </div>
  );
}
