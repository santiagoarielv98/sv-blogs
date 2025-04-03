import SkeletonListTags from "@/components/skeleton-list-tags";

export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>

      <SkeletonListTags />
    </div>
  );
}
