import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-6" role="banner">
      <Avatar className="h-32 w-32 shadow-lg">
        <AvatarImage
          src={user.image ?? undefined}
          alt={`Avatar of ${user.name}`}
          aria-label={`${user.name}'s profile picture`}
        />
        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
      </Avatar>
      <div role="contentinfo">
        <h1 className="mb-2 text-3xl font-bold">{user.name}</h1>
        <Badge variant="secondary">@{user.username}</Badge>
      </div>
    </div>
  );
};

export default UserProfile;
