import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: '❌ Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: '❌ Password is required.',
  }),
});

export const EmailSchema = z.object({
  email: z.string().email({
    message: '❌ Please enter a valid email address.',
  }),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, {
    message: '❌ Minimum 6 characters required.',
  }),
});

export const NewPasswordSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: '❌ Minimum 6 characters required.',
    }),
    newPassword: z.string().min(6, {
      message: '❌ Minimum 6 characters required.',
    }),
    confirmPassword: z.string().min(6, {
      message: '❌ Minimum 6 characters required.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '❌ Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: '❌ New password must be different from the old password.',
    path: ['newPassword'],
  });

export const NewEmailSchema = z.object({
  email: z.string().email({
    message: '❌ Please enter a valid email address.',
  }),
});
