import Header from "@/components/header";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default BlogLayout;
