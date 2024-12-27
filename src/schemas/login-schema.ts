import { z } from "zod";

export const loginSchema = z.object({
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

export type LoginSchema = z.infer<typeof loginSchema>;
