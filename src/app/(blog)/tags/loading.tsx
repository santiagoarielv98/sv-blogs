import SkeletonListPosts from "@/components/skeleton-list-posts";

export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>

      <SkeletonListPosts />
    </div>
  );
}
