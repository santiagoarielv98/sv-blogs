import React from "react";
import { ErrorScreen } from "@/components/error-screen";

const UserNotFound = () => {
  return (
    <ErrorScreen
      title="User Not Found"
      message="Sorry, we couldn't find the user you're looking for."
    />
  );
};

export default UserNotFound;
