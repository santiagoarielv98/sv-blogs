"use client";

import { SocialButtons } from "@/components/auth/social-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginSchema } from "@/schemas/login-schema";
import { loginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SubmitButton } from "../submit-button";
import React from "react";
import useProviderAuth from "@/hooks/use-provider-auth";

const LoginForm = () => {
  const { isLoading, authenticate } = useProviderAuth();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn("credentials", {
      ...values,
      callbackUrl: "/",
    });
  };

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold" id="login-title">
          Sign In
        </CardTitle>
        <CardDescription id="login-description">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialButtons loading={isSubmitting} onProviderAuth={authenticate} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            aria-labelledby="login-title"
            aria-describedby="login-description"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      aria-describedby="email-error"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="email-error" aria-live="polite" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton loading={isSubmitting}>
              Sign In with Email
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <span className="text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link href="/register">
          <Button variant="link">Sign Up</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
