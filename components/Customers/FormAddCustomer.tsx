'use client';

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import LocationComponent from '@/components/Location/LocationComponent'
import { actionAddCustomer, actionEditCustomer } from '@/app/(user)/customers/add/actions'
import toast, { Toaster } from 'react-hot-toast';


export interface FormAddCustomerRequest{
  id: number
  fullName: string,
  email: string,
  phone: string,
  address: string,
  locationTagId: number
}
const getInitialValues = (formData?: FormAddCustomerRequest): FormAddCustomerRequest => {
  return formData ?? {
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    address: '',
    locationTagId: 0
  };
};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FormAddCustomer: FC<{ formAddCustomer: FormAddCustomerRequest, editAction: boolean}> = ({ formAddCustomer, editAction }) => {
  const router = useRouter();
  const [locationId, setLocationId] = useState<number>(0);

  const formik = useFormik({
    initialValues: getInitialValues(formAddCustomer),
    onSubmit: async (values, { resetForm }) => {
      if (!editAction) {
        values.locationTagId = locationId;
        const response = await actionAddCustomer(values);
        if (response === 200) {
          toast.success("Create customer success");
          router.push('/customers');
        } else {
          toast.error("Create customer fail!");
          resetForm();
        }
      } else {
        values.locationTagId = locationId;
        const response = await actionEditCustomer(values);
        if (response === 200) {
          toast.success("Update customer success");
          router.push('/customers');
        } else {
          toast.error("Update customer fail!");
          resetForm();
        }
      }
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required('Full name is required'),
      email: Yup.string().trim().required('Email is required'),
      phone: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
      address: Yup.string().trim().required('Address is required')
    })
  });

  useEffect(() => {
    if (formAddCustomer) {
      setLocationId(formAddCustomer.id);
    }
  }, [formAddCustomer])

  const handleLocationChange = (id: number) => {
    setLocationId(id);
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 bg-white px-3 py-5 rounded">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Customer Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Add customer to send and receive items</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Full name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.fullName && (
                    <div className="text-danger">{formik.errors.fullName}</div>
                  )}
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="street-address"
                    autoComplete="street-address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address && (
                    <div className="text-danger">{formik.errors.address}</div>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <LocationComponent onLocationChange={handleLocationChange} locationId={locationId} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href='/customers' className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster />
    </>
  )
}

export default FormAddCustomer;