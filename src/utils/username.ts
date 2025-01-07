import { prisma } from "@/lib/prisma";

export function generateUsername(name: string): string {
  const baseUsername = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 15);

  return baseUsername;
}

export async function generateUniqueUsername(name: string): Promise<string> {
  const username = generateUsername(name);
  let count = 0;
  let isUnique = false;
  let finalUsername = username;

  while (!isUnique) {
    const exists = await prisma.user.findUnique({
      where: { username: finalUsername },
    });

    if (!exists) {
      isUnique = true;
    } else {
      count += 1;
      finalUsername = `${username}${count}`;
    }
  }

  return finalUsername;
}
