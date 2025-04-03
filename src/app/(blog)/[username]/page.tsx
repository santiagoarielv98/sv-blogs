import ListPosts from "@/components/list-posts";
import UserProfile from "@/components/user-profile";
import {
  getFirstPageOfPosts,
  getPublishedTags,
  getUserByUsername,
} from "@/lib/db";
import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `${user.name ?? username}'s Profile`,
    description: `Posts and articles written by ${user.name ?? username}`,
  };
}

const UserDetail = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return redirect("/404/user-not-found", RedirectType.replace);

  const config = { where: { authorId: user.id } };

  const [data, tags] = await Promise.all([
    getFirstPageOfPosts(config),
    getPublishedTags(),
  ]);

  return (
    <div className="space-y-8">
      <UserProfile user={user} />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <ListPosts initialState={data} config={config} tags={tags} />
      </div>
    </div>
  );
};

export default UserDetail;
