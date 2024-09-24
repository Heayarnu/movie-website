import { createProfile, getProfiles } from '@/actions/profile';
import { currentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { useState, useTransition } from 'react';

export async function GET(req: Request) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { profiles, error } = await getProfiles(userId);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({profiles}, { status: 200 });
}

export async function POST(req: Request) {
  const { name, imageSrc } = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  if (!name || !userId) {
    return NextResponse.json(
      { error: 'Name and User ID are required' },
      { status: 400 },
    );
  }

  const { profile, error } = await createProfile(userId, name, imageSrc);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(profile, { status: 201 });
}
