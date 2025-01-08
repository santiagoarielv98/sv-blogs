import { signIn } from "next-auth/react";
import React from "react";

const useProviderAuth = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const authenticate = async (provider: "github" | "google") => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/" });
    setIsLoading(false);
  };

  return { authenticate, isLoading };
};

export default useProviderAuth;
