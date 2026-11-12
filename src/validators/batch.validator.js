import { z } from "zod";

const isValidDate = (value) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

export const createBatchSchema = z.object({
  body: z.object({
    medicineId: z.string().uuid(),

    batchNumber: z
      .string()
      .trim()
      .min(1)
      .max(100),

    expiryDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine(isValidDate, {
        message: "Invalid expiry date"
      })
  }).strict()
});