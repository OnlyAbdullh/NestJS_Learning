import { z } from 'zod';

export const RegisterUserSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(20, { message: 'Username must not exceed 20 characters' }),
    email: z.string().email({ message: 'Invalid email address format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .int({ message: 'Age must be an integer' })
      .gte(18, { message: 'Age must be at least 18' })
      .optional(),
  })
  .strict();

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
