import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUserProfile = () => {
  return (
    <header
      className="flex items-center gap-6"
      role="banner"
      aria-busy="true"
      aria-label="Loading user profile"
    >
      <Skeleton className="h-32 w-32 rounded-full shadow-lg" />
      <div>
        <Skeleton className="mb-2 h-10 w-48" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
    </header>
  );
};

export default SkeletonUserProfile;
