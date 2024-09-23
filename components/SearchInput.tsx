import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  input: z.string().min(2).max(50),
});

interface SearchInputProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

const SearchInput = ({ showSearch, setShowSearch }: SearchInputProps) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Define form.
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
    setShowSearch(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-row"
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
                  className=" mx-0 mb-2 h-14 w-screen rounded-none border-none bg-stone-100 pl-12 text-xl text-black placeholder:text-stone-400 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-stone-500 dark:text-white md:pr-10 "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute left-0 top-0 mt-[10px]  hover:scale-125 hover:bg-transparent"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl hover:bg-transparent"
          />
        </Button>
      </form>
    </Form>
  );
};

export default SearchInput;
