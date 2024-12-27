"use client";

import { Field } from "@/components/ui/field";
import type { RegisterSchema } from "@/schemas/register-schema";
import { registerSchema } from "@/schemas/register-schema";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }

      // Redirect to the sign-in page
      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxW="md" paddingBlock={24}>
      <Stack gap={8} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text textAlign="center">Logo</Text>
        <Stack gap={3} align="center">
          <Heading size="3xl">Create an account</Heading>
          <Text color="fg.muted">Start using Chakra in your projects</Text>
        </Stack>
        <Stack gap={5}>
          <Field
            autoFocus
            label="First Name"
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <Input
              placeholder="First Name"
              autoComplete="name"
              {...register("name")}
            />
          </Field>
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              placeholder="Email"
              type="email"
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
              autoComplete="new-password"
              {...register("password")}
            />
          </Field>
          {errors.root && <Field invalid errorText={errors.root.message} />}
        </Stack>
        <Stack gap={4}>
          <Button size="lg" type="submit" disabled={isSubmitting}>
            Sign up
          </Button>
        </Stack>
        <Text textAlign="center" color="fg.muted">
          Already have an account?{" "}
          <ChakraLink color="primary" asChild>
            <Link href="/auth/sign-in">Sign in</Link>
          </ChakraLink>
        </Text>
      </Stack>
    </Container>
  );
};

export default SignUpPage;
