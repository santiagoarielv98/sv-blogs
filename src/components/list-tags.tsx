"use client";

import { getPaginatedTags } from "@/lib/db/tag";
import { Button } from "@/components/ui/button";
import type { Tag } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

type TagWithCount = Tag & { _count?: { posts: number } };

interface ListTagsProps {
  initialState?: {
    tags: TagWithCount[];
    nextCursor: string | null;
  };
}

export default function ListTags({
  initialState = {
    tags: [],
    nextCursor: null,
  },
}: ListTagsProps) {
  const [tags, setTags] = useState<TagWithCount[]>(initialState.tags);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialState.nextCursor,
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialState.nextCursor !== null);

  const fetchTags = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getPaginatedTags(nextCursor!);

      setTags((prev) => [...prev, ...data.tags]);
      setNextCursor(data.nextCursor);
      setHasMore(data.nextCursor !== null);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor]);

  return (
    <div className="space-y-6" role="navigation" aria-label="Tags navigation">
      <div className="flex flex-wrap gap-4" role="list">
        {tags.map((tag) => {
          return (
            <Button
              key={tag.id}
              asChild
              aria-label={`${tag.name} tag with ${tag._count?.posts} posts`}
              role="listitem"
            >
              <Link href={`/tag/${tag.slug}`}>
                {tag.name} ({tag._count?.posts})
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="flex justify-center">
        {hasMore && (
          <Button
            onClick={fetchTags}
            disabled={loading}
            aria-label="Load more tags"
            aria-busy={loading}
          >
            Load more tags
          </Button>
        )}
      </div>
    </div>
  );
}
