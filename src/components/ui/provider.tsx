"use client";

import {
  Box,
  Link as ChakraLink,
  ChakraProvider,
  Collapsible,
  Container,
  createSystem,
  defaultConfig,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { LuAlignRight } from "react-icons/lu";
import { Button } from "./button";
import { ColorModeProvider } from "./color-mode";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: "blue",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-outfit)" },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: "0.75rem" },
        l2: { value: "1rem" },
        l3: { value: "1.5rem" },
      },
    },
  },
});

export const Provider = (props: PropsWithChildren) => (
  <ChakraProvider value={system}>
    <ColorModeProvider>
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
              <Button>Sign In</Button>
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
      {props.children}
    </ColorModeProvider>
  </ChakraProvider>
);
