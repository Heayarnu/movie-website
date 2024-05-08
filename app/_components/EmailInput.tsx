import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setEmail } from '@/Redux/emailReducer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { EmailSchema } from '@/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { checkEmailExists } from '@/actions/register';
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

  const onSubmit = async () => {
    startTransition(async () => {
      console.log('isValid:', isValid);
      if (isValid) {
        const result = await checkEmailExists(email);
        if (result.success) {
          router.push('/SignUp');
        } else {
          setError(result.error);
        }
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center m-3">
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
                          dispatch(setEmail(e.target.value));
                          field.onChange(e);
                        }}
                        type="email"
                        className="w-60 sm:w-72 md:w-96 h-14 my-5 rounded bg-gray-200/10 border-white text-white text-lg "
                        placeholder="Email or mobile number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="sm:h-[60px] sm:w-48 w-40 h-10 text-lg flex sm:text-2xl bg-[#CC0000] hover:bg-[#990000] text-white mx-2 mt-2 sm:mt-[18px]"
            >
              Get Started <ChevronRight className="mt-1 ml-1" />
            </Button>
          </div>
          <FormError message={error} />
        </form>
      </Form>
    </div>
  );
};

export default EmailInput;
