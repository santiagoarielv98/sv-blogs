import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomNumber } from "@/types/number";

const SkeletonListPosts = () => {
  const widths = ["w-1/4", "w-1/3", "w-1/2", "w-2/3", "w-3/4", "w-full"];

  return (
    <div className="space-y-6">
      <div className="sticky top-24 z-20 mx-auto flex max-w-2xl items-center justify-center gap-4 sm:justify-end sm:pr-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-9" />
      </div>

      <div className="space-y-6" aria-busy="true" aria-label="Loading posts">
        {Array.from({ length: 5 }).map((_, index) => {
          const contentLines = getRandomNumber(1, 3);

          return (
            <div
              key={index}
              className="rounded-lg border p-6 shadow-sm"
              role="status"
              aria-label="Loading post card"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {Array.from({ length: contentLines - 1 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
                <Skeleton
                  className={`h-6 ${widths[getRandomNumber(0, widths.length - 1)]}`}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonListPosts;
