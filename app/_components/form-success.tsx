import { FormSuccessProps } from '@/types/index';

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="my-5 flex items-center gap-x-2 rounded-md bg-emerald-400 p-3 text-base text-black">
      <p>✔️ {message}</p>
    </div>
  );
};

export default FormSuccess;
