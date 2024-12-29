"use client";

import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { blogSchema } from "@/schemas/blog-schema";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface BlogFormData {
  title: string;
  description: string;
  content: string;
}

const CreateBlogPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toaster.create({
          title: "Blog post created",
          description: "Your blog post has been created successfully.",
        });
        reset();
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <Box as="main">
      <Container maxW="2xl" pt={32}>
        <Stack gap={8}>
          <Stack gap={3}>
            <Heading size="2xl">Create New Blog Post</Heading>
            <Text color="fg.muted">Share your thoughts with the world</Text>
          </Stack>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={6}>
              <Field
                invalid={!!errors.title}
                label="Title"
                errorText={errors.title?.message}
              >
                <Input
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter blog title"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                label="Description"
                errorText={errors.description?.message}
              >
                <Input
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Brief description of your blog post"
                />
              </Field>

              <Field
                invalid={!!errors.content}
                label="Content"
                errorText={errors.content?.message}
              >
                <Textarea
                  {...register("content", { required: "Content is required" })}
                  placeholder="Write your blog post content here"
                  minH="300px"
                />
              </Field>

              <Button type="submit" colorScheme="blue">
                Create Post
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default CreateBlogPage;
