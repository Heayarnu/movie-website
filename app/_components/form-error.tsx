import { FormErrorProps } from '@/types';
import { usePathname } from 'next/navigation';

const FormError = ({ message }: FormErrorProps) => {
  const pathname = usePathname();
  const shouldRender = !!message;

  if (!shouldRender) return null;

  const colorClass =
    pathname === '/'
      ? 'bg-ransparent text-red-500 justify-center -mt-10'
      : 'bg-yellow-600 text-black gap-x-2';

  return (
    <div
      className={`mb-12 p-3 rounded-md flex items-center  text-base ${colorClass}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default FormError;
