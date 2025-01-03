import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserDetail = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const user = null;

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <Image
        src={
          user.image ??
          "https://static-00.iconduck.com/assets.00/profile-default-icon-256x256-tsi8241r.png"
        }
        alt={user.name}
        width={128}
        height={128}
      />
      <ul className="space-y-4">
        {user.posts.map((post) => (
          <li key={post.id}>
            <Link href={`${user.username}/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
