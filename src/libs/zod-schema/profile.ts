import { z } from "zod";

export const ProfileSchema = z.object({
  memberPhone: z
    .string()
    .trim()
    .min(9, "at least 9 characters")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone format"),

  memberNick: z
    .string()
    .trim()
    .min(3, "Nickname must be at least 3 characters")
    .max(12, "Nickname must be under 12 characters"),

  memberFullName: z
    .string()
    .trim()
    .min(5, "at least 5 characters")
    .max(100, {
      message: "Max limit is 100 characters",
    })
    .optional(),

  memberImage: z.string().optional(),

  memberAddress: z
    .string()
    .trim()
    .max(100, {
      message: "Limit is max 100 characters",
    })
    .optional(),

  memberDesc: z
    .string()
    .trim()
    .min(5, "at least 5 characters")
    .max(100, { message: "Oops, max limit is specified (100 characters)" })
    .optional(),
});
