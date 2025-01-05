"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotFoundScreenProps {
  title: string;
  message: string;
  className?: string;
}

const NotFoundScreen = ({ title, message, className }: NotFoundScreenProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6",
        className,
      )}
    >
      <div className="space-y-2">
        <h1 className="text-7xl font-bold text-muted">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <Button
        variant="default"
        onClick={() => router.back()}
        className="min-w-[150px]"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundScreen;
