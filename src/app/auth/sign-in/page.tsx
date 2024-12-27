"use client";

import { Field } from "@/components/ui/field";
import type { LoginSchema } from "@/schemas/login-schema";
import { loginSchema } from "@/schemas/login-schema";
import {
  Button,
  Link as ChakraLink,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      setError("root", {
        type: "manual",
        message: "Las credenciales no son válidas",
      });
    }
  };

  return (
    <Container maxW="md" paddingBlock={24}>
      <Stack gap={8} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text textAlign="center">Logo</Text>
        <Stack gap={3} align="center">
          <Heading size="3xl">Welcome back</Heading>
          <Text color="fg.muted">Start using Chakra in your projects</Text>
        </Stack>
        <Stack>
          <Stack gap={5}>
            <Field
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                placeholder="Email"
                autoComplete="email"
                {...register("email")}
              />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Input
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
            </Field>
            {errors.root && <Field invalid errorText={errors.root.message} />}
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Button size="lg" type="submit">
            Sign in
          </Button>
        </Stack>
        <Text textAlign="center" color="fg.muted">
          Don&apos;t have an account?{" "}
          <ChakraLink color="primary" asChild>
            <Link href="/auth/sign-up">Sign up</Link>
          </ChakraLink>
        </Text>
      </Stack>
    </Container>
  );
};

export default SignInPage;
