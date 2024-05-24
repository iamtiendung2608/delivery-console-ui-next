'use client';

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { toast, Toaster } from 'react-hot-toast'
import * as Yup from 'yup'
import LocationComponent from '@/components/Location/LocationComponent'
import { actionAddEmployee } from '@/app/admin/employee/add/actions'


export interface FormAddEmployee{
  id: number
  name: string,
  phone: string,
  address: string,
  email: string,
  locationTagId: number
}

const getInitialValues = (formData?: FormAddEmployee | null): FormAddEmployee => {
  return formData ?? {
    id: 0,
    name: '',
    phone: '',
    address: '',
    email: '',
    locationTagId: 0
  };
};

const FormAddEmployee: FC<{ formAddEmployee: FormAddEmployee | null, editAction: boolean}> = ({ formAddEmployee, editAction }) => {
  const router = useRouter();
  const [locationId, setLocationId] = useState<number>(0);

  const formik = useFormik<FormAddEmployee>({
    initialValues: getInitialValues(formAddEmployee),
    onSubmit: async (values, { resetForm }) => {
      values.locationTagId = locationId;

    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      address: Yup.string().required('Address is required'),
      email: Yup.string().required('Email is required'),
    }),
  });

  const handleLocationChange = (id: number) => {
    setLocationId(id);
  };

  const handleSubmit = async () => {
    formik.values.locationTagId = locationId;

    try {
      const response = await actionAddEmployee(formik.values);
      toast.success("Create employee success");
      router.push('/admin/employee');
    } catch {
      toast.error("Create employee fail");
      formik.resetForm();
    }
  };


  return (
    <>
      <Toaster/>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Employee</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Delivery user</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
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
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone && (
                  <div className="text-danger">{formik.errors.phone}</div>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
              <div className="sm:col-span-3">
                <button
                  className="flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                  type={'submit'}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}


export default FormAddEmployee;
