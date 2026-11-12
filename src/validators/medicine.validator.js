import { z } from "zod";

export const createMedicineSchema = z.object({
  body: z.object({
    sku: z.string().trim().min(1).max(50),
    name: z.string().trim().min(2).max(150),
    strength: z.string().trim().max(50).optional(),
    manufacturer: z.string().trim().max(150).optional()
  }).strict()
});

export const updateMedicineSchema = z.object({
  body: z.object({
    sku: z.string().trim().min(1).max(50).optional(),
    name: z.string().trim().min(2).max(150).optional(),
    strength: z.string().trim().max(50).nullable().optional(),
    manufacturer: z.string().trim().max(150).nullable().optional()
  }).strict().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided" }
  )
});