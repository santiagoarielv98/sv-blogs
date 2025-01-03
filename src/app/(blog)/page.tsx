import ListPosts from "@/components/list-posts";
import { prisma } from "@/lib/prisma";

const HomePage = async () => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

  return (
    <div className="space-y-4">
      <ListPosts posts={posts} nextCursor={nextCursor} />
    </div>
  );
};

export default HomePage;
