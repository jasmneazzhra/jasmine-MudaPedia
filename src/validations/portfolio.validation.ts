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
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .url("Invalid Live URL")
    .optional()
    .or(z.literal("")),

  image: z
    .string()
    .optional()
    .or(z.literal("")),

  featured: z.boolean().optional(),
});