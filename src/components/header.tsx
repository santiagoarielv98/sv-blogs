import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="space-x-4 p-4">
        <Link href="/">Posts</Link>
        <Link href="/tags">Tags</Link>
        {session?.user ? (
          <Link href="/logout">Logout</Link>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
