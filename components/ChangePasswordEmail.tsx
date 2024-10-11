import { emailChange, passwordChange } from '@/actions/settings';
import FormError from '@/app/_components/form-error';
import FormSuccess from '@/app/_components/form-success';
import { NewEmailSchema, NewPasswordSchema } from '@/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

interface ChangePasswordEmailProps {
  user: any;
  isChangingEmail: boolean;
  isChangingPassword: boolean;
  setIsChangingEmail: (value: boolean) => void;
  setIsChangingPassword: (value: boolean) => void;
}

const ChangePasswordEmail = ({
  user,
  isChangingEmail,
  isChangingPassword,
  setIsChangingEmail,
  setIsChangingPassword,
}: ChangePasswordEmailProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof NewEmailSchema>>({
    resolver: zodResolver(NewEmailSchema),
    defaultValues: {
      email: user?.email || undefined,
    },
  });

  const passwordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      oldPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  const onEmailSubmit = (values: z.infer<typeof NewEmailSchema>) => {
    startTransition(() => {
      emailChange(values)
        .then((data) => {
          if (data.body.error) {
            setError(data.body.error);
          } else if (data.body.message) {
            update();
            setSuccess(data.body.message);
            setIsChangingEmail(false);
            router.refresh();
          }
        })
        .catch(() => {
          setError('An unexpected error occurred.');
        });
    });
  };

  const onPasswordSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      passwordChange(values)
        .then((data) => {
          if (data.body.error) {
            setError(data.body.error);
          } else if (data.body.message) {
            update();
            setSuccess(data.body.message);
            setIsChangingPassword(false);
            router.refresh();
          }
        })
        .catch(() => {
          setError('An unexpected error occurred.');
        });
    });
  };

  if (isChangingEmail) {
    return (
      <Card className="relative mb-40 flex w-[95vw] flex-col border border-neutral-500 dark:border-neutral-300 sm:w-[90vw] xl:w-[50vw]">
        <Button
          variant="destructive"
          className="absolute right-0 top-0 h-10 w-10 text-2xl"
          onClick={() => {
            setIsChangingEmail(false);
          }}
        >
          x
        </Button>

        <CardHeader>
          <p className="text-center text-2xl font-semibold">Change Email</p>
        </CardHeader>

        <CardContent className="flex flex-col">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
              <div>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@gmail.com"
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="mt-5 flex justify-end gap-2">
                <Button
                  type="submit"
                  disabled={
                    isPending ||
                    emailForm.watch('email')?.toLowerCase() ===
                      user?.email?.toLowerCase()
                  }
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  if (isChangingPassword) {
    return (
      <Card className="relative mb-40 flex w-[95vw] flex-col border border-neutral-500 dark:border-neutral-300 sm:w-[90vw] xl:w-[50vw]">
        <Button
          variant="destructive"
          className="absolute right-0 top-0 h-10 w-10 text-2xl"
          onClick={() => {
            setIsChangingPassword(false);
          }}
        >
          x
        </Button>

        <CardHeader>
          <p className="text-center text-2xl font-semibold">Change Password</p>
        </CardHeader>

        <CardContent className="flex flex-col">
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
              <div>
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                          className="mb-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> New Password </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Confirm Password </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="mt-5 flex justify-end gap-2">
                <Button type="submit" disabled={isPending}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ChangePasswordEmail;
