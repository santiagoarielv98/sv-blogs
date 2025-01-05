"use client";

import { getPaginatedTags } from "@/actions/tag";
import { Button } from "@/components/ui/button";
import type { Tag } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

interface ListTagsProps {
  initialState?: {
    tags: Tag[];
    nextCursor: string | null;
  };
}

export default function ListTags({
  initialState = {
    tags: [],
    nextCursor: null,
  },
}: ListTagsProps) {
  const [tags, setTags] = useState<Tag[]>(initialState.tags);
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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => {
          const randomPostsCount = Math.floor(Math.random() * 100);
          return (
            <Button key={tag.id} asChild>
              <Link href={`/tag/${tag.slug}`}>
                {tag.name} ({randomPostsCount})
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="flex justify-center">
        {hasMore && (
          <Button onClick={fetchTags} disabled={loading}>
            Load more tags
          </Button>
        )}
      </div>
    </div>
  );
}
