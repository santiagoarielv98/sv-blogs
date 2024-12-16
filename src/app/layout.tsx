import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Sv - Blogs",
  description: "Mi blog personal",
};

const outfit = Outfit({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
