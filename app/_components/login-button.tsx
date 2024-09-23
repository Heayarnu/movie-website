'use client';

import { LoginButtonProps } from '@/types';
import { useRouter } from 'next/navigation';

const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/SignIn');
  };

  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
