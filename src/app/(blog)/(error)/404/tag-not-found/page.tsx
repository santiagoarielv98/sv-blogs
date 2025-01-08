import React from "react";
import { ErrorScreen } from "@/components/error-screen";

const TagNotFound = () => {
  return (
    <ErrorScreen
      variant="default"
      title="Tag Not Found"
      message="Sorry, we couldn't find the post you're looking for."
    />
  );
};

export default TagNotFound;
