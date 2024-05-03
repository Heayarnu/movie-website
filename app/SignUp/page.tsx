'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-white h-screen">
      <div className="flex mx-2 sm:mx-6 flex-row border-b border-gray-300 justify-between">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={80}
          className="w-24 sm:w-44 object-contain cursor-pointer"
          onClick={() => router.push('/')}
        />

        <Button
          className="bg-transparent text-black mt-1 sm:mt-6 lg:mt-8 sm:text-2xl  font-semibold"
          onClick={() => router.push('/SignIn')}
        >
          Sign in
        </Button>
      </div>

      <div className="w-full h-full sm:w-[470px] sm:mt-5 mx-auto">
        <Card className="sm:p-7 border-none bg-transparent flex justify-center flex-col px-4">
          <CardHeader>
            <CardTitle className="sm:mt-4 font-bold text-3xl text-black/80">
              Welcome back! <br /> Joining Netflix is easy.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-black/70 text-xl font-medium">
              Enter your password and you&apos;ll be watching in no time.
            </h2>

            <p className="text-black/70 text-lg font-medium mt-6">Email</p>

            <p className="text-black text-lg font-medium -mt-2">gab@gmailcom</p>

            <Input
              className=" my-4 rounded h-16 bg-transparent text-base border-gray-500 text-black"
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              className="bg-[#CC0000] hover:bg-[#990000] text-white h-10 w-full mt-2 
                  text-lg font-bold"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
