import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonListTags = () => {
  const widths = ["w-20", "w-24", "w-28", "w-32", "w-36", "w-40"];

  return (
    <div className="space-y-6" aria-label="Tags navigation">
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-10 ${
              widths[Math.floor(Math.random() * widths.length)]
            } rounded-md`}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonListTags;
