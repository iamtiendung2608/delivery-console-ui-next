'use client';

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import MapComponent from '@/components/Map/map'
import { useFormik } from 'formik'
import { actionSubmitSignup } from '@/app/(auth)/signup/actions'
import { toast, Toaster } from 'react-hot-toast'
import * as Yup from 'yup'
import LocationComponent from '@/components/Location/LocationComponent'
import { actionAddCustomer } from '@/app/(user)/customers/add/actions'
import { actionAddPostOffices, actionEditPostOffices } from '@/app/admin/post-offices/add/actions'


export interface FormAddPostOffices{
  id: number
  name: string,
  phone: string,
  address: string,
  longitude: string,
  latitude: string,
  sponsor: string,
  sponsorPhone: string,
  locationTagId: number
}

const getInitialValues = (formData?: FormAddPostOffices | null): FormAddPostOffices => {
  return formData ?? {
    id: 0,
    name: '',
    phone: '',
    address: '',
    longitude: '105.77645438782932',
    latitude: '21.003738403320312',
    sponsor: '',
    sponsorPhone: '',
    locationTagId: 0
  };
};

const FormAddPostOffices: FC<{ formAddPostOffices: FormAddPostOffices | null, editAction: boolean}> = ({ formAddPostOffices, editAction }) => {
  const router = useRouter();
  const [locationId, setLocationId] = useState<number>(0);

  const formik = useFormik<FormAddPostOffices>({
    initialValues: getInitialValues(formAddPostOffices),
    onSubmit: async (values, { resetForm }) => {
      values.locationTagId = locationId;

      try {
        const response = await actionAddPostOffices(values);
        toast.success("Create Post Offices success");
        router.push('/admin/post-offices');
      } catch {
        toast.error("Create Post Offices fail");
        resetForm();
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      address: Yup.string().required('Address is required'),
      sponsor: Yup.string().required('Sponsor is required'),
      sponsorPhone: Yup.string().required('Address is required'),
      code: Yup.string().required('Address is required'),
    }),
  });

  const handleLocationChange = (id: number) => {
    setLocationId(id);
  };

  const handleSubmit = async () => {
    formik.values.locationTagId = locationId;

    if (editAction) {
      try {
        const response = await actionEditPostOffices(formik.values);
        toast.success("Edit Post Offices success");
        router.push('/admin/post-offices');
      } catch {
        toast.error("Edit Post Offices fail");
        formik.resetForm();
      }
    } else {
      try {
        const response = await actionAddPostOffices(formik.values);
        toast.success("Create Post Offices success");
        router.push('/admin/post-offices');
      } catch {
        toast.error("Create Post Offices fail");
        formik.resetForm();
      }
    }
  };


  return (
    <>
      <Toaster/>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add post offices</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Where user can send/receive order</p>
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
                  Sponsor
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sponsor"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.sponsor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.sponsor && (
                    <div className="text-danger">{formik.errors.sponsor}</div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Sponsor Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sponsorPhone"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.sponsorPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.sponsorPhone && (
                  <div className="text-danger">{formik.errors.sponsorPhone}</div>
                )}
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
              {!editAction && (
                <div className="col-span-full">
                  <LocationComponent onLocationChange={handleLocationChange} locationId={locationId} />
                </div>
              )}
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Latitude
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    autoComplete="given-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.latitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.latitude && (
                    <div className="text-danger">{formik.errors.latitude}</div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Longitude
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    autoComplete="family-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formik.values.longitude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.longitude && (
                    <div className="text-danger">{formik.errors.longitude}</div>
                  )}
                </div>
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
      <MapComponent position={[Number(formik.values.latitude), Number(formik.values.longitude)]}
                    name={formik.values.name} zoom={20} phone={formik.values.phone} />
    </>
  )
}


export default FormAddPostOffices;
