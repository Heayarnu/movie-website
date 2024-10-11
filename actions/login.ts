'use server';

import { LoginSchema } from '@/Schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'invalid credentials',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirectTo: '/profiles',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: `Incorrect password for ${values.email} You can use a sign-in code, reset your password or try again.`,
          };
        default:
          return { error: 'An error occurred. Please try again.' };
      }
    }

    throw error;
  }
};
