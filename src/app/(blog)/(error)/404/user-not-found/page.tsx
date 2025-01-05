import { ErrorScreen } from "@/components/error-screen";

const UserNotFoundPage = () => {
  return (
    <ErrorScreen
      title="User Not Found"
      message="Sorry, we couldn't find the user you're looking for."
    />
  );
};

export default UserNotFoundPage;
