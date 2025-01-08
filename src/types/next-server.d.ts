import type { User } from "next-auth";
import "next/server";

declare module "next/server" {
  interface NextRequest {
    auth: User;
  }
}
