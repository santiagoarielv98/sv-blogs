import { getUserByUsername } from "@/actions/user";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserProfile from "@/components/user-profile";
import type { User } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserDetail = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return notFound();

  return (
    <div className="space-y-8">
      <UserProfile user={user as unknown as User} />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        {user.posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {user.posts.map((post, idx) => (
              <div key={post.id}>
                {idx > 0 && <Separator className="my-4" />}
                <Link
                  href={`${user.username}/${post.slug}`}
                  className="block hover:bg-accent rounded-lg p-4 transition-colors"
                >
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  {post.tags?.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
