'use client';

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormAddCustomerRequest } from '@/components/Customers/FormAddCustomer'


export interface FormAddPostOffices{
  id: number
  name: string,
  phone: string,
  address: string,
  longitude: string,
  latitude: string,
  sponsor: string,
  sponsorPhone: string,
  locationTag: {
    id: number,
    province: string,
    district: string,
    ward: string
  }
}

const getInitialValues = (formData?: FormAddPostOffices): FormAddPostOffices => {
  return formData ?? {
    id: 0,
    name: '',
    phone: '',
    address: '',
    longitude: '',
    latitude: '',
    sponsor: '',
    sponsorPhone: '',
    locationTag: {
      id: 0,
      province: '',
      district: '',
      ward: ''
    }
  };
};

const FormAddPostOffices: FC<{ formAddPostOffices: FormAddPostOffices, editAction: boolean}> = ({ formAddPostOffices, editAction }) => {
  const router = useRouter();
  const response = getInitialValues(formAddPostOffices);

  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response.name}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response.phone}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Sponsor
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response.sponsor}
                  />
                </div>
              </div>



              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response.address}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response?.locationTag?.district}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response?.locationTag?.province}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  Ward
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={response?.locationTag?.ward}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormAddPostOffices;
