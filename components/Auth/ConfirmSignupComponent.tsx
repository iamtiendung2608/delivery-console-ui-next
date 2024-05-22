'use client';

import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import { actionSubmitSignup } from '@/app/(auth)/signup/actions'
import * as Yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { actionConfirmSignup } from '@/app/(auth)/confirm-signup/actions'
import { Toaster } from 'react-hot-toast'
import { toast } from 'react-toastify'


export interface ConfirmSignupProps {
  id: number
  name: string,
  description: string,
  scale: OrganizationScale,
  category: OrganizationCategory,
  scope: OrganizationScope
}
export enum OrganizationScale {
  SMALL = 'small', LARGE = 'large', MEDIUM = 'medium'
}
export enum OrganizationCategory {
  FASHION = 'fashion', SPORT = 'sport', FRAGILE = 'fragile'
}
export enum OrganizationScope {
  PERSONAL = 'personal', ORGANIZATION = 'organization'
}
interface ConfirmSignupRequest {
  id: number;
}
const ConfirmSignupComponent: React.FC<ConfirmSignupRequest> = ({ id }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newId = searchParams.get('id');
  const formik = useFormik({
    initialValues: {
      id: id || 0,
      name: '',
      description: '',
      scale: OrganizationScale.SMALL,
      category: OrganizationCategory.FASHION,
      scope: OrganizationScope.PERSONAL
    },
    onSubmit: async (values, { resetForm }) => {
      values.id = Number(newId);
      try {
        const response = await actionConfirmSignup(values);
        toast.success("Confirm signup success!");
        router.push('/signin');
      } catch {
        toast.error("Confirm signup fail!");
        resetForm();
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required')
    })
  });

  function handleCancel() {
    router.push('/signin');
  }

  return (
    <>
      <Toaster/>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='flex flex-wrap items-center'>
          <div className='hidden w-full xl:block xl:w-1/2'>
            <div className='py-17.5 px-26 text-center'>
              <Link className='mb-5.5 inline-block' href='/'>
                <Image className='hidden dark:block' src={'/images/logo/logo.svg'} alt='Logo' width={176}
                       height={32} />
                <Image className='dark:hidden' src={'/images/logo/logo-dark.svg'} alt='Logo' width={176}
                       height={32} />
              </Link>
              <p className='2xl:px-20'>Confirm your organization data to continue using our services.</p>

              <span className='mt-15 inline-block'>
                <Image src="/images/icon/data.svg" alt="Data Icon" width={1500} height={1500} />
              </span>
            </div>
          </div>

          <div className='xl:w-1/2'>
            {/* <!-- Contact Form --> */}
            <div
              className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>Confirm Signup Form</h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Organization Size</label>
                      <select placeholder="Choose your organization size"
                              name="scale"
                              value={formik.values.scale}
                              onChange={formik.handleChange}
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="SMALL">Small</option>
                        <option value="BIG">Big</option>
                        <option value="MEDIUM">Medium</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">Organization Category</label>
                      <select name="category"
                              value={formik.values.category}
                              onChange={formik.handleChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="FASHION">Fashion</option>
                        <option value="SPORT">Sport</option>
                        <option value="FRAGILE">Fragile</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Organization name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your organization name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Organization Scope</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select name="scope"
                              value={formik.values.scope}
                              onChange={formik.handleChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="PERSONAL">Personal</option>
                        <option value="ORGANIZATION">Big Organization</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">Description</label>
                    <textarea
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="description"
                      rows={6}
                      placeholder="Type your description"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div></div>
                    <div></div>
                    <button
                      onClick={handleCancel}
                      type="reset"
                      className="flex w-full justify-center rounded border border-red-500 p-3 font-medium bg-white text-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded border border-primary p-3 font-medium text-primary bg-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default ConfirmSignupComponent;
