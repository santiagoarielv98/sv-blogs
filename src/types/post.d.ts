import type { Post, Tag, User } from "@prisma/client";

export interface PostWithTags extends Post {
  tags: Pick<Tag, "id" | "name" | "slug">[];
}
export interface PostWithAuthorAndTags extends Post {
  tags: Pick<Tag, "id" | "name" | "slug">[];
  author: Pick<User, "id", "username" | "name" | "image">;
}
