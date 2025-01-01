import slugify from "slugify";

export const uniqueSlug = (title: string) => {
  return slugify(title, { lower: true, strict: true });
};
