'use client';

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { actionSubmitSignup } from '@/app/(auth)/signup/actions'
import * as Yup from 'yup'
import Link from 'next/link'

interface ConfirmSignupProps {
  id: number
  name: string,
  description: string,
  scale: OrganizationScale,
  category: OrganizationCategory,
  scope: OrganizationScope
}
enum OrganizationScale {
  SMALL = 'small', LARGE = 'large', MEDIUM = 'medium'
}
enum OrganizationCategory {
  FASHION = 'fashion', SPORT = 'sport', FRAGILE = 'fragile'
}
enum OrganizationScope {
  PERSONAL = 'personal', ORGANIZATION = 'organization'
}
interface ConfirmSignupRequest {
  id: number;
}
const ConfirmSignupComponent: React.FC<ConfirmSignupRequest> = ({ id }) => {
  const router = useRouter();
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
      console.log(values);
      router.push('/signin');
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required')
    })
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name of Your Organization
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>


              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="description"
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Scale
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="scale"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={formik.values.scale}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {getEnumKeys(OrganizationScale).map((key, index) => (
                      <option key={index} value={key}>
                        {OrganizationScale[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {getEnumKeys(OrganizationCategory).map((key, index) => (
                      <option key={index} value={key}>
                        {OrganizationCategory[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Scope
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={formik.values.scope}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {getEnumKeys(OrganizationScope).map((key, index) => (
                      <option key={index} value={key}>
                        {OrganizationScope[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href='/signup' className="text-sm font-semibold leading-6 text-gray-900">
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
    </>
  )


}

function getEnumKeys<
  T extends string,
  TEnumValue extends string | number,
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}

export default ConfirmSignupComponent;
