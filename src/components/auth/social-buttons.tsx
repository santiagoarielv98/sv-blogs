import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export function SocialButtons({ disabled = false }: { disabled: boolean }) {
  const form = useForm();

  const isDisabled = disabled || form.formState.isSubmitting;

  const onSubmit = async (provider: string) => {
    await form.handleSubmit(async () => {
      await signIn(provider, {
        callbackUrl: "/",
      });
    })();
  };

  return (
    <div
      className="grid grid-cols-2 gap-4"
      role="group"
      aria-label="Social login options"
    >
      <Button
        type="button"
        variant="outline"
        disabled={isDisabled}
        onClick={() => onSubmit("github")}
        aria-label="Continue with Github"
      >
        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
        Github
      </Button>
      <Button
        type="button"
        disabled={isDisabled}
        variant="outline"
        onClick={() => onSubmit("google")}
        aria-label="Continue with Google"
      >
        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
        Google
      </Button>
    </div>
  );
}
