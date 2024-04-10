'use client';
import { toast } from 'react-hot-toast'
import { actionPatchPaymentMethod } from '@/app/(user)/payment-methods/actions'
import { useState } from "react";

interface StatusToggleProps {
  paymentMethodId: string;
  enabled: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({ paymentMethodId, enabled }) => {
  const [isChecked, setIsChecked] = useState(enabled);
  const handleToggle = async () => {
    const res = await actionPatchPaymentMethod(paymentMethodId, !enabled);
    if (res?.error) {
      toast.error(res?.message ?? 'Edit payment method failure!');
    } else {
      setIsChecked(!isChecked);
      toast.success(res?.message ?? 'Edit payment method successful.');
    }
  };

  return (
    <input
      type="checkbox"
      className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-success bg-success"
      checked={isChecked}
      onChange={handleToggle}
    />
  );
};