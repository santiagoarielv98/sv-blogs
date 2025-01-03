import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { generateSlug } from "../src/utils/slugify";

const prisma = new PrismaClient();

const _tags = [
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Node.js", slug: "nodejs" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Python", slug: "python" },
];

async function main() {
  const tags = await Promise.all(
    _tags.map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      }),
    ),
  );

  const demo = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      image: faker.image.avatar(),
      email: "demo@example.com",
      username: "demouser",
      name: "demo",
      password: await hashPassword("password"),
      emailVerified: new Date(),
      posts: {
        create: Array.from({ length: 100 }).map(() => {
          const title = faker.lorem.sentence();
          return {
            title,
            content: faker.lorem.paragraphs(20),
            slug: generateSlug(title),
            published: true,
            publishedAt: new Date(),
            createdAt: faker.date.between({
              from: new Date(1735689600000),
              to: new Date(1787139200000),
            }),
            tags: {
              connect: faker.helpers
                .arrayElements(tags, { min: 1, max: 3 })
                .map((tag) => ({ slug: tag.slug })),
            },
          };
        }),
      },
    },
  });

  await Promise.all(
    Array.from({ length: 25 }).map(async () => {
      const email = faker.internet.email();
      const username = faker.internet.username();
      return prisma.user.create({
        data: {
          image: faker.image.avatar(),
          email,
          username,
          name: faker.person.firstName(),
          password: await hashPassword("password"),
          emailVerified: new Date(),
          posts: {
            create: Array.from({ length: 100 }).map(() => {
              const title = faker.lorem.sentence();
              return {
                title,
                content: faker.lorem.paragraphs(5),
                slug: generateSlug(title),
                published: true,
                publishedAt: new Date(),
                createdAt: faker.date.between({
                  from: new Date(1735689600000),
                  to: new Date(1787139200000),
                }),
                tags: {
                  connect: faker.helpers
                    .arrayElements(tags, { min: 1, max: 3 })
                    .map((tag) => ({ slug: tag.slug })),
                },
              };
            }),
          },
        },
      });
    }),
  );

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
