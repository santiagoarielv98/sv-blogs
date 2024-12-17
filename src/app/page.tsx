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

const Page = () => {
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
                  The Future of SaaS: Trends to Watch in 2024
                </Heading>
              </Stack>
              <Text textStyle="lg">
                Discover the latest trends in SaaS that are shaping the future
                of digital solutions and how your business can benefit.
              </Text>
            </Stack>
            <HStack gap="4">
              <Avatar name="John Doe" size="md" />
              <Stack gap="0" fontSize="sm" lineHeight="1.25rem">
                <Text fontWeight="medium">John Doe</Text>
                <Text color="fg.muted">January 1, 2024</Text>
              </Stack>
            </HStack>
            <Grid
              templateColumns={{
                // "repeat(3, minmax(0, 1fr))"
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <GridItem key={index}>
                  <Stack gap={6}>
                    <AspectRatio bg="bg.muted" ratio={16 / 9}>
                      <Center fontSize="xl">16 / 9</Center>
                    </AspectRatio>
                    <Stack gap={3}>
                      <Stack gap={0.5}>
                        <Text textStyle="sm">Industry Insights</Text>
                        <Heading as="h2" size="2xl">
                          The Future of SaaS: Trends to Watch in 2024
                        </Heading>
                      </Stack>
                      <Text textStyle="md">
                        Discover the latest trends in SaaS that are shaping the
                        future of digital solutions and how your business can
                        benefit.
                      </Text>
                    </Stack>
                    <HStack gap="4">
                      <Avatar name="John Doe" size="md" />
                      <Stack gap="0" fontSize="sm" lineHeight="1.25rem">
                        <Text fontWeight="medium">John Doe</Text>
                        <Text color="fg.muted">January 1, 2024</Text>
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
