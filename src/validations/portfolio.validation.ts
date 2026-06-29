import { z } from "zod";

export const portfolioSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  technologies: z
    .array(z.string())
    .min(1, "Please add at least one technology"),

  category: z
    .string()
    .min(1, "Category is required"),

  githubUrl: z
    .string()
    .optional()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || /^https?:\/\/.+/.test(val), {
      message: "Invalid GitHub URL (must start with http:// or https://)",
    }),

  liveUrl: z
    .string()
    .optional()
    .transform((val) => val ?? "")
    .refine((val) => val === "" || /^https?:\/\/.+/.test(val), {
      message: "Invalid Live URL (must start with http:// or https://)",
    }),

  image: z.string().optional().default(""),

  featured: z.boolean().optional().default(false),
});