import Header from "@/components/header";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="auth" />
      <main className="container max-w-lg mx-auto p-4 mt-8">{children}</main>
    </div>
  );
};

export default AuthLayout;
