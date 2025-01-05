import React from "react";
import NotFoundScreen from "@/components/not-found-screen";

const UserNotFound = () => {
  return (
    <NotFoundScreen
      title="User Not Found"
      message="Sorry, we couldn't find the user you're looking for."
    />
  );
};

export default UserNotFound;
