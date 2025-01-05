"use client";

import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";

const errorScreenVariants = cva("text-7xl font-bold", {
  variants: {
    variant: {
      default: "text-muted",
      destructive: "text-destructive",
      warning: "text-yellow-600 dark:text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ErrorScreenProps extends VariantProps<typeof errorScreenVariants> {
  status?: number;
  title: string;
  message: string;
  className?: string;
  showBackButton?: boolean;
  customAction?: React.ReactNode;
}

const ErrorScreen = ({
  status = 404,
  title = "Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for.",
  className,
  variant,
  showBackButton = true,
  customAction,
}: ErrorScreenProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        {status && (
          <h1 className={errorScreenVariants({ variant, className })}>
            {status}
          </h1>
        )}
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-4">
        {showBackButton && (
          <Button
            variant="default"
            onClick={() => router.back()}
            className="min-w-[150px]"
          >
            Go Back
          </Button>
        )}
        {customAction}
      </div>
    </div>
  );
};

export { ErrorScreen, type ErrorScreenProps };
