import React from "react";
import { ErrorScreen } from "@/components/error-screen";

const PostNotFound = () => {
  return (
    <ErrorScreen
      variant="default"
      title="Post Not Found"
      message="Sorry, we couldn't find the post you're looking for."
    />
  );
};

export default PostNotFound;
