import { getPaginatedAdminPosts } from "@/lib/db/admin";
import TablePosts from "@/components/table-posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const data = await getPaginatedAdminPosts(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/new">Create New Post</Link>
        </Button>
      </div>

      <TablePosts initialData={data} />
    </div>
  );
}
