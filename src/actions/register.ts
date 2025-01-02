"use server";

import { registerUser } from "@/lib/api";

export const registerAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
  };
  registerUser(data);
};
