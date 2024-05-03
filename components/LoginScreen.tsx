'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChevronRight, Router } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginScreen = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div
        className="relative flex flex-col h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background-image.png')" }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-transparent to-transparent" />

        <div className="z-10 absolute inset-0 bg-opacity-40 bg-black" />

        <div className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-black/90 to-transparent" />

        <div className="z-20 flex flex-col">
          {/* NavBar */}
          <div className="flex flex-row justify-between px-5 mt-4 md:px-7 xl:px-40">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={80}
              className="w-24 lg:w-40 lg:-mt-3 object-contain"
            />

            <Button
              className="bg-[#CC0000] hover:bg-[#990000] text-white h-8 w-20 mt-2 mr-1 lg:mt-3"
              onClick={() => router.push('/SignIn')}
            >
              Sign in
            </Button>
          </div>

          <div className="flex items-center justify-center flex-col mt-16 sm:mt-28 p-3 lg:mt-44">
            <h1 className="text-[33px] leading-tight font-bold lg:text-5xl px-1 mb-4 text-center">
              Unlimited movies, Tv shows, and more
            </h1>
            <p className="font-semibold text-xl lg:text-2xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="font-semibold text-lg px-4 lg:px-16 text-center mt-6 lg:text-xl">
              Ready to watch? Enter your email or mobile number to create or
              restart your membership.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center m-3 px-16">
            <Input
              placeholder="Email or mobile number"
              className="rounded w-72 sm:w-96 h-14  border-white text-lg my-5 bg-gray-200/10"
            />

            <Button
              className="h-[60px] w-48 text-2xl bg-[#CC0000] hover:bg-[#990000] text-white mx-2"
              onClick={() => router.push('/SignUp')}
            >
              Get Started <ChevronRight className="mt-1 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Rows */}

      {/* Footer */}
    </div>
  );
};

export default LoginScreen;
