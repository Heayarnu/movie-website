import { FormErrorProps } from '@/types';

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-yellow-600 mb-12 p-3 rounded-md flex items-center gap-x-2 text-base text-black">
      <p>{message}</p>
    </div>
  );
};

export default FormError;
