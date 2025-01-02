"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="space-x-4 p-4">
        <Link href="/">Home</Link>
        <Link href="/tags">Tags</Link>
        {session?.user ? (
          <>
            <Link href={`/profile`}>Profile</Link>
            <button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
