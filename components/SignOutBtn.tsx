import { signOut } from 'next-auth/react';
import { useTransition } from 'react';
import { Button } from './ui/button';

const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <Button
      variant="ghost"
      type="button"
      disabled={isPending}
      onClick={handleSignOut}
      className="p-5 text-lg md:p-8 md:text-2xl xl:p-5"
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
