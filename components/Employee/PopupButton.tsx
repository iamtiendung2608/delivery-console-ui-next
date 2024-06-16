'use client';

import React, { FC, useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PostOfficesDropDownComponent from '@/components/PostOffices/PostOfficeDropDown';
import { Toaster } from 'react-hot-toast';
import { actionCreateTransaction } from '@/app/employee/order/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { actionGetPostOfficesWithSize } from '@/app/(user)/post-offices/actions'
import Select from 'react-select';

export enum TransactionStatus {
  CREATED = 0,
  RECEIVED = 1,
  TRANSPORTING = 2,
  TRANSPORTED = 2,
  DELIVERING = 3,
  DELIVERED = 4,
}

const PopupButton: FC<{ id: number; status: TransactionStatus, path: string }> = ({ id, status, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [officesId, setOfficesId] = useState<number>();
  const [note, setNote] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>(); // Initial value set to CREATED
  const [offices, setOffices] = useState([]);
  const router = useRouter();

  useEffect( () => {
    fetchPostOffices('');
  }, []);

  const fetchPostOffices = async (searchTerm) => {
    try {
      const response = await actionGetPostOfficesWithSize(searchTerm, 0);
      const data = await response;
      setOffices(data.content);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
    }
  };

  const handleSearchInputChange = (event, value) => {
    fetchPostOffices(value);
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    try {
      const response = await actionCreateTransaction(id, officesId, note, selectedStatus);
      toast.success("Create new transaction success");
      togglePopup();
      window.location.href = path;
      window.location.reload();
    } catch (error) {
      toast.error("Create new transaction fail");
    }
  };

  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredOptions = Object.entries(TransactionStatus)
    .filter(([key, value]) => parseInt(key) >= Number(TransactionStatus[status]) && value !== status)
    .map(([key, value]) => ({ key: parseInt(key), value }));

  return (
    <>
      <Toaster />
      <button className="flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray" onClick={togglePopup}>
        Open Popup
      </button>
      <Popup closeOnDocumentClick className="border-primary rounded" open={isOpen} onClose={togglePopup} position="right center">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update order status</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="transaction-status" className="block text-sm font-medium leading-6 text-gray-900">
                Transaction Status
              </label>
              <div className="mt-2">
                <select
                  id="transaction-status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Choose new status</option>
                  {/* Render filtered options */}
                  {filteredOptions.map((option) => (
                    <option key={option.key} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="post-offices" className="block text-sm font-medium leading-6 text-gray-900">
                Post Offices
              </label>
              <div className="mt-2">
                <Select
                  className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  options={offices}
                  getOptionLabel={(option) => option.name}
                  onChange={(value) => setOfficesId(value.id)}
                  onInputChange={handleSearchInputChange} // Triggered as the user types
                />
              </div>
            </div>

            <div className="col-span-full">
              <textarea
                className="flex w-full justify-center rounded border border-primary p-3 font-medium text-primary bg-white"
                name="description"
                id="description"
                rows={6}
                placeholder="Note..."
                value={note}
                onChange={(e) => handleNoteChange(e.target.value)}
              ></textarea>
            </div>

            <div className="col-span-full">
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded border border-primary p-3 font-medium text-primary bg-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default PopupButton;
