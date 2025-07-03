import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Please provide a valid email.')
    .email('Please provide a valid email.'),
  password: z.string().nonempty('Please provide a password.'),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;
export const LoginFormDefaultValues: LoginForm = {
  email: '',
  password: '',
} as const;

export const SignUpFormSchema = z
  .object({
    email: z.string().email('Please provide a valid email'),
    password: z
      .string()
      .nonempty('Please provide a password')
      .min(8, 'Password must me atleast 8 characters long.')
      .regex(/[A-Z]/, 'Password must contain atleast one upper case character.')
      .regex(/[a-z]/, 'Password must contain atleast one lower case character.')
      .regex(/[0-9]/, 'Password must contain atleast on number.'),
    confirmPassword: z.string().nonempty('Please confirm your password.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password do not match.',
        path: ['confirmPassword'],
      });
    }
  });
export type SignUpForm = z.infer<typeof SignUpFormSchema>;
export const SignUpFormDefaultValues: SignUpForm = {
  email: '',
  password: '',
  confirmPassword: '',
};
