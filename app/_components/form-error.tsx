import { FormErrorProps } from '@/types/index';
import { usePathname } from 'next/navigation';

const FormError = ({ message }: FormErrorProps) => {
  const pathname = usePathname();
  const shouldRender = !!message;

  if (!shouldRender) return null;

  const colorClass =
    pathname === '/'
      ? 'bg-transparent text-red-500 justify-center -mt-10'
      : pathname === '/MyAccount'
        ? 'bg-red-200 text-red-500 gap-x-2 mt-5'
        : 'bg-yellow-600 text-black gap-x-2';

  return (
    <div
      className={`mb-12 flex items-center rounded-md p-3  text-base ${colorClass}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default FormError;
