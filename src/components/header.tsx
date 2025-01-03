"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <nav className="container max-w-xl mx-auto p-4 flex items-center justify-center gap-x-4">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/tags">Tags</Link>
        </Button>
        {session?.user ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/new">Create Post</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={`/profile`}>Profile</Link>
            </Button>
            <Button variant="ghost" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
