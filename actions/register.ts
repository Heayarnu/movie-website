// Import necessary modules
'use server';

import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { PasswordSchema } from '@/Schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

/**
 * Check if the provided email already exists in the database.
 *
 * @param email - The email to check.
 * @returns A promise that resolves to an object indicating success or failure.
 */
export const checkEmailExists = async (
  email: string,
): Promise<{ success?: string; error?: string }> => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: '⚠️ Email already in use!',
    };
  }

  return { success: 'Email is valid and not in use!' };
};

/**
 * Register a new user.
 *
 * @param email - The user's email.
 * @param passwordInput - The user's password.
 * @returns A promise that resolves to an object indicating success or failure.
 */
export const register = async (
  email: string,
  passwordInput: z.infer<typeof PasswordSchema>,
): Promise<{ success?: string; error?: string }> => {
  // Validate the password
  const validatedPassword = PasswordSchema.safeParse(passwordInput);

  // If the password is invalid, return an error
  if (!validatedPassword.success) {
    return {
      error: 'Invalid input',
    };
  }

  // Extract the password from the validated data
  const { password } = validatedPassword.data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  await db.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  // Return a success message
  return { success: 'User created!' };
};
