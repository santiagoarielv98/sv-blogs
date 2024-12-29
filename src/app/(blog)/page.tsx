import { Avatar } from "@/components/ui/avatar";
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

export const getData = async () => {
  const data = await fetch("http://localhost:3000/api/blog");
  const posts = await data.json();

  return posts;
};

const Page = async () => {
  const posts = await getData();

  const latestPost = posts[0] || {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget semper orci",
    author: {
      name: "John Doe",
      email: "john@doe.com",
    },
  };
  const remainingPosts = posts.slice(1);

  console.log(latestPost, remainingPosts);
  return (
    <Box as="main">
      <Box bg="colorPalette.600">
        <Container paddingTop={24} paddingBottom={48}>
          <Stack gap={6}>
            <Stack gap={4}>
              <Text textStyle="md">blog</Text>
              <Heading as="h1" size="5xl">
                Latest Insights
              </Heading>
            </Stack>
            <Text textStyle="xl">
              Stay updated with the latest trends and insights from our experts.
              Read our articles on various topics and enhance your knowledge.
            </Text>
          </Stack>
        </Container>
      </Box>
      <Container marginBlockStart={-24} paddingBottom={24}>
        <Stack gap={16}>
          <Stack gap={6}>
            <AspectRatio bg="bg.muted" ratio={16 / 9}>
              <Center fontSize="xl">16 / 9</Center>
            </AspectRatio>
            <Stack gap={3}>
              <Stack gap={0.5}>
                <Text textStyle="sm">Industry Insights</Text>
                <Heading as="h2" size="4xl">
                  {latestPost.title}
                </Heading>
              </Stack>
              <Text textStyle="lg">{latestPost.description}</Text>
            </Stack>
            <HStack gap="4">
              <Avatar name="John Doe" size="md" />
              <Stack gap="0" fontSize="sm" lineHeight="1.25rem">
                <Text fontWeight="medium">{latestPost.author.name}</Text>
                <Text color="fg.muted">{latestPost.author.email}</Text>
              </Stack>
            </HStack>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {remainingPosts.map((post) => (
                <GridItem key={post.id}>
                  <Stack gap={6}>
                    <AspectRatio bg="bg.muted" ratio={16 / 9}>
                      <Center fontSize="xl">16 / 9</Center>
                    </AspectRatio>
                    <Stack gap={3}>
                      <Stack gap={0.5}>
                        <Text textStyle="sm">Industry Insights</Text>
                        <Heading as="h2" size="2xl">
                          {post.title}
                        </Heading>
                      </Stack>
                      <Text textStyle="md">{post.description}</Text>
                    </Stack>
                    <HStack gap="4">
                      <Avatar name="John Doe" size="md" />
                      <Stack gap="0" fontSize="sm" lineHeight="1.25rem">
                        <Text fontWeight="medium">{post.author.name}</Text>
                        <Text color="fg.muted">{post.author.email}</Text>
                      </Stack>
                    </HStack>
                  </Stack>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
