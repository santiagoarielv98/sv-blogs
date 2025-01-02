"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="space-x-4 p-4">
        <Link href="/">Posts</Link>
        <Link href="/tags">Tags</Link>
        {session?.user ? (
          <button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
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
