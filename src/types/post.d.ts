import type { Post, Tag, User } from "@prisma/client";

export type PostWithoutFields = Omit<
  Post,
  "authorId" | "createdAt" | "updatedAt"
>;

export interface PostWithTags extends PostWithoutFields {
  tags: Pick<Tag, "id" | "name" | "slug">[];
}
export interface PostWithAuthorAndTags extends PostWithoutFields {
  tags: Pick<Tag, "id" | "name" | "slug">[];
  author: Pick<User, "id", "username" | "name" | "image">;
}
