import { getFirstPageOfPosts } from "@/lib/db";
import { getUserByUsername } from "@/actions/user";
import ListPosts from "@/components/list-posts";
import UserProfile from "@/components/user-profile";
import type { User } from "@prisma/client";
import { notFound } from "next/navigation";

const UserDetail = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return notFound();

  const config = { where: { authorId: user.id } };
  const data = await getFirstPageOfPosts(config);

  return (
    <div className="space-y-8">
      <UserProfile user={user as unknown as User} />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <ListPosts initialState={data} config={config} />
      </div>
    </div>
  );
};

export default UserDetail;
