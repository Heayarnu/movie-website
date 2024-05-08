import { FormSuccessProps } from '@/types';

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-400 my-5 p-3 rounded-md flex items-center gap-x-2 text-base text-emerald-700">
      <p>✔️ {message}</p>
    </div>
  );
};

export default FormSuccess;
