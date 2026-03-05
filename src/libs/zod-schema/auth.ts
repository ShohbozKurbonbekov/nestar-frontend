import { z } from "zod";
import { MemberType } from "../enums/member.enum";

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
  role: z
    .string()
    .min(1, "Use one of member type.")
    .refine((val) => ["USER", "AGENT"].includes(val), {
      message: "Use one of member type.",
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type LoginFormInputs = z.input<typeof loginSchema>;
export type SignupFormInputs = z.input<typeof signupSchema>;
