'use client';
import { toast, Toaster } from 'react-hot-toast'
import { actionPatchPaymentMethod } from '@/app/(user)/payment-methods/actions'
import { useState } from "react";
import { actionChangeEmployeeStatus } from '@/app/admin/employee/actions'

interface EmployeeStatusToggleProps {
  employeeId: string;
  active: boolean;
}

export const EmployeeStatusToggle: React.FC<EmployeeStatusToggleProps> = ({ employeeId, active }) => {
  const [isChecked, setIsChecked] = useState(active);
  const handleToggle = async () => {
    const res = await actionChangeEmployeeStatus(Number(employeeId), !active);
    if (res !== 200) {
      toast.error('Edit employee failure!');
    } else {
      setIsChecked(!isChecked);
      toast.success('Edit employee successful.');
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