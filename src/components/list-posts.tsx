"use client";

import { getFirstPageOfPosts, getPaginatedPosts } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./cards/post-card";
import type { PostWithAuthorAndTags } from "@/types/post";
import { LoaderCircle } from "lucide-react";
import SearchBar from "./search-bar";
import { TagFilter } from "./tag-filter";

interface ListPostsProps {
  readonly initialState?: {
    posts: PostWithAuthorAndTags[];
    nextCursor: string | null;
  };
  readonly config?: Prisma.PostFindManyArgs;
  readonly tags: Array<{ id: string; name: string; slug: string }>;
}

export default function ListPosts({
  initialState: initialData = { posts: [], nextCursor: null },
  config,
  tags,
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setLoading(true);
    const data = await getFirstPageOfPosts(config, term, selectedTags);
    setPosts(data.posts);
    setNextCursor(data.nextCursor);
    setHasMore(data.nextCursor !== null);
    setLoading(false);
  };

  const handleTagSelect = async (tags: string[]) => {
    setSelectedTags(tags);
    setLoading(true);
    const data = await getFirstPageOfPosts(config, searchTerm, tags);
    setPosts(data.posts);
    setNextCursor(data.nextCursor);
    setHasMore(data.nextCursor !== null);
    setLoading(false);
  };

  const fetchPosts = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getPaginatedPosts(
        nextCursor as string,
        config,
        searchTerm,
        selectedTags,
      );
      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor, config, searchTerm, selectedTags]);

  useEffect(() => {
    if (inView) fetchPosts();
  }, [fetchPosts, inView]);

  return (
    <div className="space-y-6">
      <div className="sticky top-24 z-20 mx-auto flex max-w-2xl items-center justify-center gap-4 sm:justify-end sm:pr-4">
        <SearchBar onSearch={handleSearch} />
        {tags.length > 0 && (
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        )}
      </div>

      <div className="space-y-6" aria-busy={loading} aria-label="Posts list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {hasMore && (
          <div
            ref={ref}
            className="flex justify-center"
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
        {!hasMore && <p className="text-center">No more posts to show</p>}
      </div>
    </div>
  );
}
