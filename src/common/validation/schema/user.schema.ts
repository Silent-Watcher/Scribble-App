import { z } from 'zod';

export const zUser = z
  .object({
    displayName: z.string().trim().optional(),
    email: z.string().trim().email('invalid email format!'),
    isEmailVerified: z.boolean().default(false),
    password: z
      .string()
      .trim()
      .min(8, 'password should be at least 8 characters'),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type User = z.infer<typeof zUser>;
