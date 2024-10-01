import {
  changeProfileName,
  createProfile,
  deleteProfile,
  getProfiles,
} from '@/actions/profile';
import { currentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

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

  return NextResponse.json({ profiles }, { status: 200 });
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

export async function PUT(req: Request) {
  const { profileId, newName } = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  if (!profileId || !newName || !userId) {
    return NextResponse.json(
      { error: 'Profile ID, new name, and User ID are required' },
      { status: 400 },
    );
  }

  const { profile, error } = await changeProfileName(profileId, newName);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(profile, { status: 200 });
}

export async function DELETE(req: Request) {
  const { profileId } = await req.json();
  const user = await currentUser();
  const userId = user?.id;

  if (!profileId || !userId) {
    return NextResponse.json(
      { error: 'Profile ID and User ID are required' },
      { status: 400 },
    );
  }

  const { success, error } = await deleteProfile(profileId);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success }, { status: 200 });
}
