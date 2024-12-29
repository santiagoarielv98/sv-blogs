import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .max(200, "Description must be less than 200 characters")
    .optional(),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content is required")
    .min(5, "Content must be more than 5 characters"),
});
