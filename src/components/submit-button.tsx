import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFormState } from "react-hook-form";

export const SubmitButton = ({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) => {
  const { isSubmitting } = useFormState();
  const isDisabled = isSubmitting || disabled;
  return (
    <Button
      className="w-full"
      type="submit"
      disabled={isDisabled}
      aria-busy={isDisabled}
      aria-label={isDisabled ? "Submitting..." : "Submit"}
    >
      {isDisabled ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
};
