'use client';

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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/Schemas';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import FormError from '@/app/_components/form-error';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import Loader from '@/components/Loader';

const Page = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [error, setError] = useState<string | undefined>('');
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setLoading(true);

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error); // Add null check for 'data'
      });

      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex flex-col">
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
            <Card className="p-10 border-none bg-black sm:bg-opacity-75 flex justify-center flex-col mb-20">
              <CardHeader>
                <CardTitle className="font-bold text-4xl text-white">
                  Sign In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormError message={error} />

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="email"
                              className="my-4 rounded h-16 bg-gray-200/10 text-white border-white text-lg"
                              placeholder="Email or mobile number"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              className="my-4 rounded h-16 f bg-gray-200/10 border-white text-lg text-white"
                              placeholder="Password"
                              type="password"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {loading ? (
                      <Button
                        type="button"
                        disabled={isPending}
                        className="bg-[#CC0000] hover:bg-[#990000] text-white h-10 w-full mt-2 text-lg font-bold"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#CC0000] hover:bg-[#990000] text-white h-10 w-full mt-2 text-lg font-bold"
                      >
                        Sign in
                      </Button>
                    )}
                  </form>
                </Form>

                {/* 

                 */}

                <p className="text-gray-300 mt-3">
                  New to Netflix?{' '}
                  <span
                    className="font-bold cursor-pointer text-lg text-white"
                    onClick={() => router.push('/')}
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
    </div>
  );
};

export default Page;
