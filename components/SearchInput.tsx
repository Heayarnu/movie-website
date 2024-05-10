import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

const formSchema = z.object({
  input: z.string().min(2).max(50),
});

interface SearchInputProps {
  showSearch?: boolean;
}

const SearchInput = ({ showSearch }: SearchInputProps) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  //  Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  // Define submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/search/${values.input}`);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row relative"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search..."
                  {...field}
                  ref={inputRef}
                  className={`md:pr-10 lg:bg-inherit focus:border-none focus-visible:ring-0  focus-visible:ring-offset-0 lg:focus-visible:outline-none lg:focus-visible:ring-2 focus-visible:ring-ring lg:focus-visible:ring-offset-2 ${
                    showSearch
                      ? 'border-none rounded-none mx-0 pl-12  placeholder:text-stone-700 text-black bg-stone-100 dark:placeholder:text-stone-300 w-screen mb-2 h-14 text-xl dark:bg-stone-500 dark:text-white'
                      : ''
                  }`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute mt-[10px] lg:mt-0 lg:right-0 lg:top-0 left-0 lg:left-auto"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl lg:text-base"
          />
        </Button>
      </form>
    </Form>
  );
};

export default SearchInput;
