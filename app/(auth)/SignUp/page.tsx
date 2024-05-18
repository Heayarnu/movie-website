'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState, useTransition } from 'react';
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
import FormError from '@/app/_components/form-error';
import Loader from '@/components/Loader';
import { Check, CheckCircle2Icon } from 'lucide-react';
import SignUpNav from '@/app/_components/SignUpNav';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const email = useAppSelector((state) => state.email.value);

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onSubmit = (passwordInput: z.infer<typeof PasswordSchema>) => {
    setError('');
    setSuccess('');
    setLoading(true);

    startTransition(() => {
      register(email, passwordInput).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        // If registration is successful, sign in the user
        if (!data.error) {
          signIn('credentials', {
            email: email,
            password: passwordInput.password,
            redirect: false,
          });
        }
      });

      setLoading(false);
      setIsSubmitted(true);
    });
  };

  return (
    <div className="h-screen bg-white">
      <div className="mx-auto h-full w-full sm:mt-5 sm:w-[470px]">
        <Card className="flex flex-col justify-center border-none bg-transparent px-4 sm:p-7">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-black/80 sm:mt-4">
              {!isSubmitted ? (
                <p>
                  Welcome back! <br /> Joining Netflix is easy.
                </p>
              ) : (
                <p className=" flex flex-col text-center text-base font-normal">
                  <div className="mb-7 flex items-center justify-center">
                    <CheckCircle2Icon className="h-14 w-14 text-[#CC0000]" />
                  </div>

                  <div>
                    STEP <span className="font-bold"> 1 </span> OF{' '}
                    <span className="font-bold">3</span>
                  </div>

                  <div className="ml-6 self-start text-4xl font-bold">
                    Choose your plan.
                  </div>
                </p>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <div>
                <h2 className="text-xl font-medium text-black/70">
                  Enter your password and you&apos;ll be watching in no time.
                </h2>

                <p className="mt-6 text-lg font-medium text-black/70">Email</p>

                <p className="-mt-2 text-lg font-medium text-black">{email}</p>
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
                              className="f my-4 h-16 rounded border-white bg-gray-200/10 text-lg text-black"
                              placeholder="Enter your password"
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
                        className="mt-2 h-10 w-full bg-[#CC0000] text-lg font-bold 
                  text-white hover:bg-[#990000]"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 h-10 w-full bg-[#CC0000] text-lg font-bold 
                  text-white hover:bg-[#990000]"
                      >
                        Next
                      </Button>
                    )}

                    <FormError message={error} />
                  </form>
                </Form>
              </div>
            ) : (
              <div
                className="max-w-80 space-y-3 text-xl
              "
              >
                <p className="flex">
                  {' '}
                  <Check className="mr-2 mt-1 h-10 w-8 text-[#CC0000]" /> No
                  commitments, cancel at any time.
                </p>
                <p className="flex">
                  {' '}
                  <Check className="mr-2 mt-1 h-10 w-8 text-[#CC0000]" />
                  Everything on Netflix for one low price.
                </p>
                <p className="flex">
                  {' '}
                  <Check className="mr-2 mt-2 h-10 w-8 text-[#CC0000]" />
                  No adverts and no extra fees. Ever.
                </p>

                <Button
                  onClick={() => {
                    router.push('/SignUp/planform');
                  }}
                  className="mt-2 h-14 w-full rounded-none bg-[#CC0000] text-lg font-bold text-white hover:bg-[#990000]"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
