import React from "react";
import SkeletonUserProfile from "@/components/skeleton-user-profile";
import SkeletonListPosts from "@/components/skeleton-list-posts";

export default function UserProfileLoading() {
  return (
    <div className="space-y-8">
      <SkeletonUserProfile />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <SkeletonListPosts />
      </div>
    </div>
  );
}
