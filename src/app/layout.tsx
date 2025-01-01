import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { auth } from "@/lib/auth";
import NextAuthProvider from "@/app/provider";

export const metadata: Metadata = {
  title: "Sv - Blogs",
  description: "Mi blog personal",
};

const outfit = Outfit({});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
