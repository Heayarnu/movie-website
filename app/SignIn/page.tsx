'use client';

import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { setEmail } from '@/Redux/emailReducer';

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.email.value);

  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      <div
        className="relative flex flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background-image.png')" }}
      >
        <div className="z-10 absolute inset-0 sm:bg-opacity-30 bg-black" />

        <div className="z-20 flex flex-col">
          <div className="flex flex-row justify-between px-5 mt-4 md:px-7 xl:px-40">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={80}
              className="w-24 lg:w-40 lg:-mt-3 object-contain cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>

          <div className="w-full h-full sm:w-[470px] sm:mt-5 mx-auto">
            <Card className="sm:p-7 border-none bg-black sm:bg-opacity-75 flex justify-center flex-col">
              <CardHeader>
                <CardTitle className="sm:mt-4 font-bold text-4xl">
                  Sign In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  className="my-4 rounded h-16 bg-gray-200/10 border-white text-lg"
                  placeholder="Email or mobile number"
                />

                <Input
                  ref={passwordRef}
                  className="my-4 rounded h-16 f bg-gray-200/10 border-white text-lg"
                  placeholder="Password"
                />

                <Button
                  type="submit"
                  className="bg-[#CC0000] hover:bg-[#990000] text-white h-10 w-full mt-2 text-lg font-bold"
                >
                  Sign in
                </Button>

                <p className="text-gray-300 mt-3">
                  New to Netflix?{' '}
                  <span
                    className="font-bold cursor-pointer text-lg text-white"
                    onClick={() => router.push('/SignUp')}
                  >
                    Sign up now.
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-gray-400">
                  This page is protected by Google reCAPTCHA to ensure
                  you&apos;re not bot.{' '}
                  <span className="text-blue-600 cursor-pointer">
                    {' '}
                    learn more
                  </span>{' '}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
