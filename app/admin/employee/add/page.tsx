import React from 'react'
import { Metadata } from 'next'
import SignupComponent from '@/components/Auth/SignupComponent'
import { useFormik } from 'formik'
import FormAddPostOffices from '@/components/PostOffices/FormAddPostOffices'
import FormAddEmployee from '@/components/Employee/FormAddEmployee'
export const metadata: Metadata = {
  title: 'Employee Page | Next.js E-commerce Dashboard Template',
  description: 'This is Signup page for TailAdmin Next.js'
  // other metadata
}

export default function AddPostOffice() {
  return (
    <>
      <FormAddEmployee formAddPostOffices={null} editAction={false}/>
    </>
  )
}

