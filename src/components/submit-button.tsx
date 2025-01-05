import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFormState } from "react-hook-form";

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { isSubmitting } = useFormState();

  return (
    <Button className="w-full" type="submit" disabled={isSubmitting}>
      {isSubmitting ? <LoaderCircle className="animate-spin h-4 w-4" /> : null}
      {children}
    </Button>
  );
};
