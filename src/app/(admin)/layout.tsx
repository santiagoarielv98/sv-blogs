import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Admin Layout</div>
      {children}
    </>
  );
};

export default AdminLayout;
