import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const SignOutBtn = () => {
  return (
    <div>
      <Button
        variant="ghost"
        type="button"
        onClick={() => signOut()}
        className="bg-[#CC0000]
      hover:bg-[#990000] text-white"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutBtn;
