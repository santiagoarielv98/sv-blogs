"use client";

import { registerAction } from "@/actions/register";

const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>

      <form action={registerAction}>
        <label>
          Email:
          <input type="text" name="email" autoComplete="email" autoFocus />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" autoComplete="username" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" autoComplete="name" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" autoComplete="new-password" />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
