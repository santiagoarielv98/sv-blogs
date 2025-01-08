import type { User as UserPrisma } from "@prisma/client";

export type User = Pick<UserPrisma, "id" | "name" | "image" | "username">;
