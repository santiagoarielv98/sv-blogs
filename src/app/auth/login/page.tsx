"use client";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const credentialsAction = (formData: FormData) => {
    signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the login page</p>

      <form action={credentialsAction}>
        <label>
          Email:
          <input type="text" name="email" autoComplete="email" autoFocus />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
