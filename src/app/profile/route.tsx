import { getProfile } from "@/lib/api";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const GET = async () => {
  const session = await auth();

  if (session?.user?.email) {
    const user = await getProfile(session.user.email);
    if (user) {
      return redirect(`/${user.username}`);
    }
  }
  return { status: 404 };
};
