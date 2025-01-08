import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function SocialButtons({
  loading = false,
  onProviderAuth,
}: {
  loading?: boolean;
  onProviderAuth: (provider: "github" | "google") => void;
}) {
  return (
    <div
      className="grid grid-cols-2 gap-4"
      role="group"
      aria-label="Social login options"
    >
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={() => onProviderAuth("github")}
        aria-label="Continue with Github"
      >
        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
        Github
      </Button>
      <Button
        type="button"
        disabled={loading}
        variant="outline"
        onClick={() => onProviderAuth("google")}
        aria-label="Continue with Google"
      >
        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
        Google
      </Button>
    </div>
  );
}
