"use client";

import {
  deletePost,
  getPaginatedAdminPosts,
  togglePublishPost,
} from "@/actions/admin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import type { PostWithTags } from "@/types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [posts, setPosts] = useState<PostWithTags[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadPosts = async (page: number) => {
    try {
      setLoading(true);
      const data = await getPaginatedAdminPosts(page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load posts",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      loadPosts(currentPage);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  const handleTogglePublish = async (postId: string) => {
    try {
      await togglePublishPost(postId);
      loadPosts(currentPage);
      toast({
        title: "Success",
        description: "Post status updated successfully",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update post status",
      });
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex justify-center gap-2 items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
            disabled={loading}
            className="w-10"
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/new">Create New Post</Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleTogglePublish(post.id)}
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(post.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/post/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/post/${post.slug}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {renderPagination()}
    </div>
  );
}
