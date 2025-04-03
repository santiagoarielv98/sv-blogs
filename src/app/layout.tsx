import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { auth } from "@/lib/auth";

import { SessionProvider } from "next-auth/react";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Sv - Blogs",
    template: "%s | Sv - Blogs",
  },
  icons: {
    icon: "/blocks.svg",
    shortcut: "/blocks.svg",
    apple: "/blocks.svg",
  },
  description:
    "Personal blog about web development, technology and programming",
  keywords: [
    "blog",
    "web development",
    "technology",
    "programming",
    "javascript",
    "typescript",
  ],
  authors: [{ name: "Santiago" }],
  openGraph: {
    title: "Sv - Blogs",
    description:
      "Personal blog about web development, technology and programming",
    url: "https://sv-blogs.vercel.app",
    siteName: "Sv - Blogs",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const outfit = Outfit({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Header />
              <main className="container mx-auto max-w-4xl p-4 pt-16">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
