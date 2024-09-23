import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const SignOutBtn = () => {
  return (
    <div>
      <Button
        variant="ghost"
        type="button"
        onClick={() => signOut()}
        className="text-lg md:text-2xl p-5 md:p-8 xl:p-5"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutBtn;
