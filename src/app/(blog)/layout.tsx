import Header from "@/components/header";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-4xl p-4">{children}</main>
    </div>
  );
};

export default BlogLayout;
