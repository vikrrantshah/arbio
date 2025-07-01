import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;

export const SignUpFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/(!@#\$%\^&*\)\(+=._-)/),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
