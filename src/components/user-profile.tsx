import React from "react";
import Image from "next/image";
import type { User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-6">
      <Image
        src={
          user.image ??
          "https://static-00.iconduck.com/assets.00/profile-default-icon-256x256-tsi8241r.png"
        }
        alt={user.name}
        width={128}
        height={128}
        className="rounded-full shadow-lg"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <Badge variant="secondary">@{user.username}</Badge>
      </div>
    </div>
  );
};

export default UserProfile;
