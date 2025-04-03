import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomNumber } from "@/utils/number";

const SkeletonPostDetail = () => {
  const widths = ["w-1/4", "w-1/3", "w-1/2", "w-2/3", "w-3/4", "w-full"];

  return (
    <article
      className="mb-8 space-y-6"
      role="status"
      aria-busy="true"
      aria-label="Loading post details"
    >
      <div className="flex items-center gap-4">
        <Skeleton
          className="h-10 w-10 rounded-full"
          aria-label="Loading author avatar"
        />
        <div>
          <Skeleton className="h-5 w-32" aria-label="Loading author name" />
          <div className="mt-1 flex items-center">
            <Skeleton className="h-4 w-24" aria-label="Loading post date" />
          </div>
        </div>
      </div>

      <Skeleton className="h-10 w-3/4" aria-label="Loading post title" />

      <div className="flex flex-wrap gap-2" aria-label="Loading post tags">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-6 w-16 rounded-full"
            aria-label="Loading tag"
          />
        ))}
      </div>

      <div className="space-y-4" aria-label="Loading post content">
        {Array.from({ length: getRandomNumber(5, 8) }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-full" aria-label="Loading paragraph" />
            <Skeleton className="h-5 w-full" aria-label="Loading paragraph" />
            <Skeleton
              className={`h-5 ${widths[getRandomNumber(0, widths.length - 1)]}`}
              aria-label="Loading paragraph"
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default SkeletonPostDetail;
