import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { uniqueSlug } from "../src/utils/slugify";

const prisma = new PrismaClient();

async function main() {
  const demo = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "demo",
      password: await hashPassword("password"),
      posts: {
        create: Array.from({ length: 10 }).map(() => {
          const title = faker.lorem.sentence();
          return {
            title,
            content: faker.lorem.paragraphs(20),
            slug: uniqueSlug(title),
            published: true,
          };
        }),
      },
    },
  });
  console.log({ demo });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
