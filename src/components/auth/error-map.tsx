import { AuthError } from "@/constants/auth";
import { FormMessage } from "@/components/ui/form";

export const errorMap = {
  [AuthError.Configuration]: (
    <FormMessage>
      There was a problem when trying to authenticate. Please contact us if this
      error persists.
    </FormMessage>
  ),
  [AuthError.Credentials]: (
    <FormMessage>
      The email or password you entered is incorrect. Please try again.
    </FormMessage>
  ),
  [AuthError.Unregistered]: (
    <FormMessage>
      This email is not registered. Please sign up for an account.
    </FormMessage>
  ),
};
