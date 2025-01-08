import { ErrorScreen } from "@/components/error-screen";

const UnauthorizedPage = () => {
  return (
    <ErrorScreen
      variant="destructive"
      title="Unauthorized Access"
      message="You don't have permission to view this page."
      status={403}
    />
  );
};

export default UnauthorizedPage;
