import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <nav className="space-x-4 p-4">
          <Link href="/">Logo</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </nav>
      </header>
      {children}
    </>
  );
};

export default layout;
