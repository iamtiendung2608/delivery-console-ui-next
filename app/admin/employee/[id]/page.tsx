import React from 'react'
import { GetStaticPropsContext, Metadata } from 'next'
import SignupComponent from '@/components/Auth/SignupComponent'
import { useFormik } from 'formik'
import FormAddPostOffices from '@/components/PostOffices/FormAddPostOffices'
import { actionGetPostOfficesDetail } from '@/app/(user)/post-offices/[id]/actions'
import FormAddCustomer from '@/components/Customers/FormAddCustomer'
import { actionGetAdminEmployeeDetail } from '@/app/admin/employee/actions'
import FormAddEmployee from '@/components/Employee/FormAddEmployee'
export const metadata: Metadata = {
  title: 'Post Offices Page | Next.js E-commerce Dashboard Template',
  description: 'This is Signup page for TailAdmin Next.js'
  // other metadata
}

const EditPostOffices = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;
  const response = await actionGetAdminEmployeeDetail(id);

  return (
    <>
      <FormAddEmployee formAddEmployee={response} editAction={true}/>
    </>
  )
}


export default EditPostOffices;
