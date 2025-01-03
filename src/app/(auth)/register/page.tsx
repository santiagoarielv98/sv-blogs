"use client";

import { register } from "@/actions/register";

const RegisterPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await register({
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    });
  };
  return (
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
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
