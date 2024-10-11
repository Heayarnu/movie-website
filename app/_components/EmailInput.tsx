import { setEmail } from '@/Redux/emailReducer';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { EmailSchema } from '@/Schemas';
import { checkEmailExists } from '@/actions/register';
import Loader from '@/components/Loader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormError from './form-error';

const EmailInput = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof EmailSchema>>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(EmailSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email.value);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    startTransition(async () => {
      if (isValid) {
        const result = await checkEmailExists(email.toLowerCase());

        if (result.success) {
          router.push('/SignUp');
        } else {
          setError(result.error);
        }
      }

      setLoading(false);
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-3 flex flex-col items-center justify-center sm:flex-row sm:items-start">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        onChange={(e) => {
                          dispatch(setEmail(e.target.value.toLowerCase()));
                          field.onChange(e);
                        }}
                        type="email"
                        className="mb-2 mt-5 h-14 w-60 rounded border-white bg-gray-200/10 text-lg text-white sm:w-72 md:w-96 "
                        placeholder="Email or mobile number"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <FormError message={error} />{' '}
                  </FormItem>
                )}
              />
            </div>

            {loading ? (
              <Button
                type="button"
                disabled={isPending}
                className="mx-2 mt-2 flex h-10 w-40 bg-[#CC0000] text-lg text-white hover:bg-[#990000] sm:mt-[18px] sm:h-[60px] sm:w-48 sm:text-2xl"
              >
                <Loader />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="mx-2 mt-2 flex h-10 w-40 bg-[#CC0000] text-lg text-white hover:bg-[#990000] sm:mt-[18px] sm:h-[60px] sm:w-48 sm:text-2xl"
              >
                Get Started <ChevronRight className="ml-1 mt-0.5 sm:mt-1" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailInput;
