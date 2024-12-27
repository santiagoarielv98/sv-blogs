import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "./provider";
import { auth } from "@/lib/auth";

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
        <Provider>
          <NextAuthProvider session={session}>{children}</NextAuthProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
