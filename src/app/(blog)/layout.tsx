"use client";

import { Button } from "@/components/ui/button";
import {
  Box,
  Link as ChakraLink,
  Collapsible,
  Container,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuAlignRight } from "react-icons/lu";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Box position="fixed" zIndex="docked" top={6} insetX={4}>
        <Container
          maxW={{
            base: "full",
            md: "fit-content",
          }}
          borderRadius="l3"
          bg="bg.panel"
          paddingBlock={3}
          paddingInline={4}
          shadow="sm"
        >
          <Collapsible.Root>
            <HStack
              gap={{
                base: 3,
                md: 8,
              }}
            >
              <div>Logo</div>
              <Box display={{ base: "block", md: "none" }} flex={1} />
              <HStack
                gap={8}
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
                <ChakraLink>Home</ChakraLink>
                <ChakraLink>Blog</ChakraLink>
                <ChakraLink>About</ChakraLink>
                <ChakraLink>Contact</ChakraLink>
              </HStack>
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Collapsible.Trigger asChild display={{ md: "none" }}>
                <IconButton>
                  <LuAlignRight />
                </IconButton>
              </Collapsible.Trigger>
            </HStack>
            <Collapsible.Content
              display={{
                md: "none",
                base: "block",
              }}
            >
              <Stack gap={4} paddingTop={5} paddingBottom={2}>
                <ChakraLink>Home</ChakraLink>
                <ChakraLink>Blog</ChakraLink>
                <ChakraLink>About</ChakraLink>
                <ChakraLink>Contact</ChakraLink>
              </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
        </Container>
      </Box>
      {children}
    </>
  );
};

export default layout;
