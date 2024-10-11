'use client';

import { LoginSchema } from '@/Schemas';
import { login } from '@/actions/login';
import FormError from '@/app/_components/form-error';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
        setError(data?.error);
      });

      setLoading(false);
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex flex-col">
        <div className="absolute inset-0 z-10 bg-black sm:bg-opacity-30" />

        <div className="z-20 flex flex-col">
          <div className="mt-4 flex flex-row justify-between px-5 md:px-7 xl:px-40">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={80}
              className="w-24 cursor-pointer object-contain lg:-mt-3 lg:w-40"
              onClick={() => router.push('/')}
            />
          </div>

          <div className="mx-auto mb-20 h-full w-full sm:mt-5 sm:w-[470px]">
            <Card className="flex flex-col justify-center border-none bg-black p-10 sm:bg-opacity-75">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-white">
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
                              className="my-4 h-16 rounded border-white bg-gray-200/10 text-lg text-white"
                              placeholder="Email or mobile number"
                            />
                          </FormControl>
                          <FormMessage />
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
                              className="f my-4 h-16 rounded border-white bg-gray-200/10 text-lg text-white"
                              placeholder="Password"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {loading ? (
                      <Button
                        type="button"
                        disabled={isPending}
                        className="mt-2 h-10 w-full bg-[#CC0000] text-lg font-bold text-white hover:bg-[#990000]"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 h-10 w-full bg-[#CC0000] text-lg font-bold text-white hover:bg-[#990000]"
                      >
                        Sign in
                      </Button>
                    )}
                  </form>
                </Form>

                {/* 

                 */}

                <p className="mt-3 text-gray-300">
                  New to Netflix?{' '}
                  <span
                    className="cursor-pointer text-lg font-bold text-white"
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
                  <span className="cursor-pointer text-blue-600">
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
