import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { auth } from "@/lib/auth";

import { SessionProvider } from "next-auth/react";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Sv - Blogs",
  description: "Mi blog personal",
};

const outfit = Outfit();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
