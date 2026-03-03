import { z } from "zod";

// -------------------- Login -----------------
export const loginSchema = z.object({
  memberNick: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(12, "Nickname must be under 12 characters"),
  memberPassword: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(12, "Password must be under 12 characters"),
});

// -------------------- Signup -----------------
export const signupSchema = z.object({
  memberNick: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(12, "Nickname must be under 12 characters"),
  memberPassword: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(12, "Password must be under 12 characters"),
  memberPhone: z
    .string()
    .min(9, "Phone number must be valid")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone format"),
  role: z.enum(["USER", "AGENT"]),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
