import Header from "@/components/header";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default BlogLayout;
