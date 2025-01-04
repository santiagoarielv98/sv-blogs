"use client";

import { postUpsertAction } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { CreatePostInput } from "@/schemas/post-schema";
import { createPostSchema } from "@/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export interface PostFormProps {
  initialValues?: Post & { tags: { name: string }[] };
}

const PostForm = ({ initialValues }: PostFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
      tags: initialValues?.tags.map((tag) => tag.name).join(",") ?? "",
      published: initialValues?.published ?? false,
    },
  });

  async function onSubmit(values: CreatePostInput) {
    try {
      const post = await postUpsertAction({
        ...values,
        slug: initialValues?.slug ?? undefined,
        tags: values.tags.split(",").map((tag) => tag.trim()),
      });

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      router.replace(`/${post.author.username}/${post.slug}/edit`);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post",
      });
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your post title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div className="min-h-[300px]">
                      <ReactQuill
                        theme="snow"
                        {...field}
                        className="h-[250px]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="react, nextjs, typescript (comma separated)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Publish immediately</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" className="w-full">
                {form.getValues("published") ? "Publish Post" : "Save Draft"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
