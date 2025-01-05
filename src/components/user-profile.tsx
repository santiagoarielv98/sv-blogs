import React from "react";
import Image from "next/image";
import type { User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-6" role="banner">
      <Image
        src={
          user.image ??
          "https://static-00.iconduck.com/assets.00/profile-default-icon-256x256-tsi8241r.png"
        }
        alt={`Avatar of ${user.name}`}
        width={128}
        height={128}
        className="rounded-full shadow-lg"
        aria-label={`${user.name}'s profile picture`}
      />
      <div role="contentinfo">
        <h1 className="mb-2 text-3xl font-bold">{user.name}</h1>
        <Badge variant="secondary">@{user.username}</Badge>
      </div>
    </div>
  );
};

export default UserProfile;
