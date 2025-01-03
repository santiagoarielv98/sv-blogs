"use client";

import { getPaginatedTags } from "@/actions/tag";
import { Button } from "@/components/ui/button";
import type { Tag } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

interface ListTagsProps {
  tags: Tag[];
  nextCursor: string | null;
}

export default function ListTags({
  tags = [],
  nextCursor = null,
}: ListTagsProps) {
  const [_tags, setTags] = useState<Tag[]>(tags);
  const [_nextCursor, setNextCursor] = useState<string | null>(nextCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(nextCursor !== null);

  const fetchTags = React.useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { nextCursor, tags } = await getPaginatedTags(_nextCursor!);

      setTags((prev) => [...prev, ...tags]);
      setNextCursor(nextCursor);
      setHasMore(nextCursor !== null);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, _nextCursor]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {_tags.map((tag) => {
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
    </>
  );
}
