'use client';
import { toast } from 'react-hot-toast'
import { actionDeletePaymentMethod } from "@/app/(user)/payment-methods/[id]/actions";
import { useRouter } from "next/navigation";

interface StatusToggleProps {
  paymentMethodId: string;
}

export const DeleteMethodButton: React.FC<StatusToggleProps> = ({ paymentMethodId}) => {
  const router = useRouter();
  const handleClick = async () => {
    const res = await actionDeletePaymentMethod(paymentMethodId);
    if (res?.error) {
      toast.error(res?.message ?? 'Delete payment method failure!');
    } else {
      router.refresh();
      toast.success(res?.message ?? 'Delete payment method successful.');
    }
  };


  return (
    <button onClick={handleClick} className='flex w-full justify-center rounded bg-danger px-2 py-1 font-medium text-gray'>
      Delete
    </button>
  );
};