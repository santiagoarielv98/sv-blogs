"use client";

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
import type { CreatePostInput } from "@/schemas/post-schema";
import { createPostSchema } from "@/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";
import { SubmitButton } from "@/components/submit-button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export interface PostFormProps {
  initialValues?: CreatePostInput;
  onSubmit: (values: CreatePostInput) => void;
}

const PostForm = ({ initialValues, onSubmit }: PostFormProps) => {
  const router = useRouter();

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
      tags: initialValues?.tags ?? "",
      published: initialValues?.published ?? false,
    },
  });

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
                    <Input
                      {...field}
                      placeholder="Enter your post title"
                      aria-describedby="title-description"
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
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
                        aria-label="Post content editor"
                      />
                    </div>
                  </FormControl>
                  <FormMessage aria-live="polite" />
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
                      aria-describedby="tags-description"
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
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
                      aria-label="Publish post toggle"
                    />
                  </FormControl>
                  <FormLabel>Publish immediately</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex gap-4" role="group" aria-label="Form actions">
              <SubmitButton>
                {form.getValues("published") ? "Publish Post" : "Save Draft"}
              </SubmitButton>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={form.formState.isSubmitting}
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
