export const DEFAULT_SELECT_USER = {
  id: true,
  name: true,
  image: true,
  username: true,
};

export const DEFAULT_SELECT_TAG = {
  id: true,
  name: true,
  slug: true,
};

export const DEFAULT_SELECT_POST = {
  id: true,
  title: true,
  content: true,
  slug: true,
  published: true,
  publishedAt: true,
};

export const DEFAULT_SELECT_COMMENT = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  parentId: true,
  postId: true,
  authorId: true,
};
