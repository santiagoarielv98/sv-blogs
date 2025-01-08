import Header from "@/components/header";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="auth" />
      <main className="container mx-auto mt-8 max-w-lg p-4 pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
