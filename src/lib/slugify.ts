import { generateHash } from "@/utils/hash";
import { generateSlug } from "@/utils/slugify";
import { prisma } from "./prisma";

export async function generateUniqueSlug(title: string, isDraft = false) {
  const baseSlug = generateSlug(title);
  let uniqueSlug = baseSlug;
  let iteration = 0;

  while (true) {
    const suffix = isDraft
      ? `_draft_${generateHash()}`
      : iteration > 0
        ? `_${generateHash()}`
        : "";
    uniqueSlug = `${baseSlug}${suffix}`;

    const existingPost = await prisma.post.findUnique({
      where: { slug: uniqueSlug },
    });
    if (!existingPost) break;

    iteration++;
  }
  return uniqueSlug;
}
