// import type { Post, Tag, User } from "@prisma/client";

import type { Tag } from "./tag";
import type { User } from "./user";

export type PostWithoutFields = Omit<
  Post,
  "authorId" | "createdAt" | "updatedAt"
>;

export interface PostWithTags extends PostWithoutFields {
  tags: Tag[];
}
export interface PostWithAuthorAndTags extends PostWithoutFields {
  tags: Tag[];
  author: User;
}
