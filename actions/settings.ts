'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NewEmailSchema, NewPasswordSchema } from '@/Schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const emailChange = async (values: z.infer<typeof NewEmailSchema>) => {
  const user = await currentUser();
  if (!user) {
    return {
      status: 401,
      body: { error: 'Unauthorized' },
    };
  }

  const userId = user.id;
  if (!userId) {
    return {
      status: 400,
      body: { error: 'Invalid user ID' },
    };
  }

  const dbUser = await getUserById(userId);
  if (!dbUser) {
    return {
      status: 404,
      body: { error: 'User not found' },
    };
  }

  if (
    values.email &&
    values.email.toLowerCase() !== user.email?.toLowerCase()
  ) {
    const existingUser = await getUserByEmail(values.email.toLowerCase());

    if (existingUser && existingUser.id !== user.id) {
      return {
        status: 400,
        body: { error: 'Email already in use' },
      };
    }
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      email: values.email.toLowerCase(),
    },
  });

  return {
    status: 200,
    body: { message: 'Email updated successfully' },
  };
};

const passwordChange = async (values: z.infer<typeof NewPasswordSchema>) => {
  const user = await currentUser();
  if (!user) {
    return {
      status: 401,
      body: { error: 'Unauthorized' },
    };
  }

  const userId = user.id;
  if (!userId) {
    return {
      status: 400,
      body: { error: 'Invalid user ID' },
    };
  }

  const dbUser = await getUserById(userId);
  if (!dbUser) {
    return {
      status: 404,
      body: { error: 'User not found' },
    };
  }

  if (
    values.oldPassword &&
    values.newPassword &&
    values.confirmPassword &&
    dbUser.password
  ) {
    const oldPasswordMatch = await bcrypt.compare(
      values.oldPassword,
      dbUser.password,
    );

    if (!oldPasswordMatch) {
      return {
        status: 400,
        body: { error: 'Old password is incorrect' },
      };
    }

    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        password: hashedNewPassword,
      },
    });
  } else {
    return {
      status: 400,
      body: { error: 'Invalid input' },
    };
  }

  return {
    status: 200,
    body: { message: 'Password updated successfully' },
  };
};

export { emailChange, passwordChange };
