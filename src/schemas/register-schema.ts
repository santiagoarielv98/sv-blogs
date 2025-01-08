import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es requerido" })
    .min(1, "El nombre de usuario es requerido")
    .min(4, "El nombre de usuario debe tener más de 4 caracteres")
    .max(32, "El nombre de usuario debe tener menos de 32 caracteres"),
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido")
    .max(32, "El nombre debe tener menos de 32 caracteres"),
  email: z
    .string({ required_error: "El correo electrónico es requerido" })
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido"),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener más de 6 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
