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

export const changeProfileName = async (profileId: string, newName: string) => {
  try {
    const profile = await db.profile.update({
      where: { id: profileId },
      data: { name: newName },
    });

    return { profile };
  } catch (error) {
    console.error(
      `Error changing profile name for profileId ${profileId}:`,
      error,
    );
    return { error: 'Failed to change profile name.' };
  }
};

export const deleteProfile = async (profileId: string) => {
  try {
    await db.profile.delete({
      where: { id: profileId },
    });

    return { success: true };
  } catch (error) {
    console.error(`Error deleting profile for profileId ${profileId}:`, error);
    return { error: 'Failed to delete profile.' };
  }
};
