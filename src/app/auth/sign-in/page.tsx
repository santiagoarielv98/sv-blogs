import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SignInPage = () => {
  return (
    <Container maxW="md" paddingBlock={24}>
      <Stack gap={8}>
        <Text textAlign="center">Logo</Text>
        <Stack gap={3} align="center">
          <Heading size="3xl">Welcome back</Heading>
          <Text color="fg.muted">Start using Chakra in your projects</Text>
        </Stack>
        <Stack>
          <Stack gap={5}>
            <Field label="Email">
              <Input placeholder="Email" />
            </Field>
            <Field label="Password">
              <Input placeholder="Password" />
            </Field>
          </Stack>
          <HStack justify="space-between" gap={0.5}>
            <Checkbox>Remember me</Checkbox>
            <Button variant="ghost">Forgot password</Button>
          </HStack>
        </Stack>
        <Stack gap={4}>
          <Button size="lg">Sign in</Button>
          <Button variant="outline" size="lg">
            Sign up
          </Button>
        </Stack>
        <Text textAlign="center" color="fg.muted">
          Don&apos;t have an account?{" "}
          <Link color="primary" href="/auth/sign-up">
            Sign up
          </Link>
        </Text>
      </Stack>
    </Container>
  );
};

export default SignInPage;
