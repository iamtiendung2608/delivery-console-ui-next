'use client';


import React, { FC } from 'react';

export enum TransactionStatus {
  CREATED = 0,
  RECEIVED = 1,
  TRANSPORTING = 2,
  TRANSPORTED = 2,
  DELIVERING = 3,
  DELIVERED = 4
}

const PopupDataComponent: FC<{ id: number, status: TransactionStatus }> = ({ id, status }) => {

  const filteredOptions = Object.keys(TransactionStatus)
    .filter(key => parseInt(key) > status)
    .map(key => ({ key: parseInt(key), value: TransactionStatus[key as keyof typeof TransactionStatus] }));

  const handleSubmit = () => {
    //call API

  }

  return (
    <>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Update order status</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Transaction
              Status</label>
            <div className="mt-2">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Choose new status</option>
                {/* Render filtered options */}
                {filteredOptions.map(option => (
                  <option key={option.key} value={option.key}>{option.value}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Post
              Offices</label>
            <div className="mt-2">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Choose location</option>
                <option value="">USA</option>
                <option value="">UK</option>
                <option value="">Canada</option>
              </select>
            </div>
          </div>

          <div className='col-span-full'>
            <textarea
              className='flex w-full justify-center rounded border border-primary p-3 font-medium text-primary bg-white'
              name='description'
              id='description'
              rows={6}
              placeholder='Note...'
            ></textarea>
          </div>

          <div className='col-span-full'>
            <button onClick={handleSubmit}
                    className="flex w-full justify-center rounded border border-primary p-3 font-medium text-primary bg-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupDataComponent;
