import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

export const currentUser = async () => {
  // server side page
  const session = await auth();

  return session?.user;
};

export const useCurrentUser = () => {
  // client side page

  const session = useSession();

  return session.data?.user;
};
