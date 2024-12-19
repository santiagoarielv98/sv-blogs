import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <Container maxW="md" paddingBlock={24}>
      <Stack gap={8}>
        <Text textAlign="center">Logo</Text>
        <Stack gap={3} align="center">
          <Heading size="3xl">Create an account</Heading>
          <Text color="fg.muted">Start using Chakra in your projects</Text>
        </Stack>
        <Stack gap={5}>
          <Field label="First Name">
            <Input placeholder="First Name" autoComplete="given-name" />
          </Field>
          <Field label="Last Name">
            <Input placeholder="Last Name" autoComplete="family-name" />
          </Field>
          <Field label="Email">
            <Input placeholder="Email" type="email" autoComplete="email" />
          </Field>
          <Field label="Password">
            <Input
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />
          </Field>
          <Field label="Confirm Password">
            <Input
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
            />
          </Field>
          <HStack justify="space-between" gap={0.5}>
            <Checkbox>Accept terms and conditions</Checkbox>
          </HStack>
        </Stack>
        <Stack gap={4}>
          <Button size="lg">Sign up</Button>
        </Stack>
        <Text textAlign="center" color="fg.muted">
          Already have an account?{" "}
          <ChakraLink color="primary">
            <Link href="/auth/sign-in">Sign in</Link>
          </ChakraLink>
        </Text>
      </Stack>
    </Container>
  );
};

export default SignUpPage;
