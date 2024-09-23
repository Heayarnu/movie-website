'use client';

import SignOutBtn from '@/components/SignOutBtn';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SignUpNav = ({ isLoggedIn }: any) => {
  const router = useRouter();

  return (
    <div className="mx-2 flex flex-row items-center justify-between border-b border-gray-300 py-4 sm:mx-6">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={80}
        className="w-24 cursor-pointer object-contain sm:w-44"
        onClick={() => router.push('/')}
      />

      {!isLoggedIn ? (
        <Button
          className="mt-1 transform bg-transparent font-semibold text-black transition-all  hover:bg-[#990000] hover:text-white sm:mt-6 sm:text-2xl lg:mt-8"
          onClick={() => router.push('/SignIn')}
        >
          Sign in
        </Button>
      ) : (
        <div>
          <SignOutBtn />
        </div>
      )}
    </div>
  );
};

export default SignUpNav;
