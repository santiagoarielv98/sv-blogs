import Header from "@/components/header";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <div>Admin Layout</div>
      {children}
    </>
  );
};

export default AdminLayout;
