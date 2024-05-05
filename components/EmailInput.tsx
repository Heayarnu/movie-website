import { setEmail } from "@/Redux/emailReducer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";

const EmailInput = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email.value);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center m-3 px-16">
      <Input
        value={email}
        type="email"
        placeholder="Email or mobile number"
        onChange={(e) => dispatch(setEmail(e.target.value))}
        className="rounded w-56 sm:w-96 h-14  border-white text-lg my-5 bg-gray-200/10"
      />

      <Button
        className="sm:h-[60px] sm:w-48 w-40 h-10 text-lg sm:text-2xl bg-[#CC0000] hover:bg-[#990000] text-white mx-2"
        onClick={() => router.push('/SignUp')}
      >
        Get Started <ChevronRight className="mt-1 ml-1" />
      </Button>
    </div>
  );
};

export default EmailInput;
