export const defaultSelectPost = {
  id: true,
  slug: true,
  title: true,
  content: true,
  published: true,
  publishedAt: true,
} as const;

export const defaultSelectUser = {
  id: true,
  name: true,
  email: true,
  username: true,
  image: true,
} as const;

export const defaultSelectTag = {
  id: true,
  name: true,
  slug: true,
} as const;
