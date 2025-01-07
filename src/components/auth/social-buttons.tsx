import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

interface SocialButtonsProps {
  /**
   * Callback URL after successful authentication
   * @default "/"
   */
  callbackUrl?: string;
}

export function SocialButtons({ callbackUrl = "/" }: SocialButtonsProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4"
      role="group"
      aria-label="Social login options"
    >
      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl })}
        aria-label="Continue with Github"
      >
        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
        Github
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("google", { callbackUrl })}
        aria-label="Continue with Google"
      >
        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
        Google
      </Button>
    </div>
  );
}
