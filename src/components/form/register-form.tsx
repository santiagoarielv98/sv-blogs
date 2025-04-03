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
import useProviderAuth from "@/hooks/use-provider-auth";
import { register } from "@/lib/db/register";
import { registerSchema, type RegisterSchema } from "@/schemas/register-schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SubmitButton } from "../submit-button";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const { isLoading, authenticate } = useProviderAuth();

  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await register(values);

      if (!response.success && response.errors) {
        response.errors.forEach((error) => {
          form.setError(error.path[0] as keyof RegisterSchema, {
            message: error.message,
          });
        });

        return;
      }

      router.push("/login");
    } catch {}
  };

  const isSubmitting = form.formState.isSubmitting ?? isLoading;

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold" id="register-title">
          Create an account
        </CardTitle>
        <CardDescription id="register-description">
          Enter your information to get started
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
            aria-labelledby="register-title"
            aria-describedby="register-description"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="Create a password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton loading={isSubmitting}>Create Account</SubmitButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <span className="text-muted-foreground">Already have an account?</span>
        <Link href="/login">
          <Button variant="link">Sign In</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
