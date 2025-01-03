"use client";

import { getPaginatedTags } from "@/actions/tag";
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
    <div className="tags-container">
      {_tags.map((tag) => (
        <div key={tag.id} className="tag bg-gray-100 p-4 mb-4 rounded shadow">
          <Link href={`/tag/${tag.slug}`}>
            <h2 className="text-lg font-bold">{tag.name}</h2>
          </Link>
          <small className="text-gray-500">
            {new Date(tag.createdAt).toLocaleString()}
          </small>
        </div>
      ))}

      {hasMore ? (
        <>
          {loading ? (
            <p>Loading more tags...</p>
          ) : (
            <button onClick={fetchTags} disabled={loading}>
              Load more tags
            </button>
          )}
        </>
      ) : (
        <p>No more tags to show</p>
      )}
    </div>
  );
}
