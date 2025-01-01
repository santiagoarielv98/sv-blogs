import { signIn } from "@/lib/auth";
import React from "react";

const LoginPage = () => {
  const loginAction = async (formData: FormData) => {
    "use server";
    await signIn("credentials", formData);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the login page</p>

      <form action={loginAction}>
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
