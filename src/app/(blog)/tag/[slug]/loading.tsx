import SkeletonListPosts from "@/components/skeleton-list-posts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        Posts tagged with
        <Skeleton className="h-6 w-24 rounded-full" />
      </h1>
      <SkeletonListPosts hideFilter />
    </div>
  );
}
