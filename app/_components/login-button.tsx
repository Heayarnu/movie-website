'use client';

import { LoginButtonProps } from '@/types/index';
import { useRouter } from 'next/navigation';

const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/SignIn');
  };

  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
