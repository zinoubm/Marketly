import { z } from "zod";

export const SignUpValidationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password1: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
    password2: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

export const LoginValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});
