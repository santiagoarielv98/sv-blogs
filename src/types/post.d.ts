import type { Post, Tag, User } from "@prisma/client";

export interface PostWithAuthorAndTags extends Post {
  tags: Pick<Tag, "id" | "name" | "slug">[];
  author: Pick<User, "username" | "name" | "image">;
}
