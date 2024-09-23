'use server';

import { db } from '@/lib/db';

export const createProfile = async (
  userId: string,
  name: string,
  imageSrc: string = '/default-profile-image.webp',
) => {
  try {
    const profileCount = await db.profile.count({ where: { userId } });

    if (profileCount >= 4) {
      throw new Error('You can only have up to 4 profiles.');
    }

    const profile = await db.profile.create({
      data: {
        name,
        imageSrc,
        userId,
      },
    });

    return { profile };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const getProfiles = async (userId: string) => {
  try {
    const profiles = await db.profile.findMany({ where: { userId } });
    return { profiles };
  } catch (error) {
    console.error(`Error fetching profiles for userId ${userId}:`, error);
    return { error: 'Failed to fetch profiles.' };
  }
};
