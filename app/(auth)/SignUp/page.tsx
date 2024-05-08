'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordSchema } from '@/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { register } from '@/actions/register';
import { useAppSelector } from '@/Redux/hooks';
import FormSuccess from '@/app/_components/form-success';
import FormError from '@/app/_components/form-error';

const Page = () => {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const email = useAppSelector((state) => state.email.value);

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = (passwordInput: z.infer<typeof PasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(email, passwordInput).then((data) => {
        setError(data.error);
      });
    });
  };

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
          className="bg-transparent text-black mt-1 sm:mt-6 lg:mt-8 sm:text-2xl  font-semibold hover:bg-[#990000] transition-all transform hover:text-white"
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

            <p className="text-black text-lg font-medium -mt-2">{email}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="my-4 rounded h-16 f bg-gray-200/10 text-black border-white text-lg"
                          placeholder="Enter your password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-[#CC0000] hover:bg-[#990000] text-white h-10 w-full mt-2 
                  text-lg font-bold"
                >
                  Next
                </Button>

                <FormSuccess message={success} />
                <FormError message={error} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
