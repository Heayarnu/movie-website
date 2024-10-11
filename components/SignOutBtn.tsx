import { signOut } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { ClipLoader } from 'react-spinners';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';

const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
    });
  };

  const handleClick = () => {
    setIsDialogOpen(true);
    handleSignOut();
  };

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        disabled={isPending}
        onClick={handleClick}
        className="p-5 text-lg md:p-8 md:text-2xl xl:p-5"
      >
        Sign Out
      </Button>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="flex flex-col items-center justify-center p-6 md:p-8 xl:p-10">
            <DialogHeader className="mb-4 flex w-full items-center justify-center text-center text-xl">
              Signing out
            </DialogHeader>
            <ClipLoader color="red" size={35} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SignOutBtn;
