import React from 'react'
import { Metadata } from 'next'
import SignupComponent from '@/components/Auth/SignupComponent'
import { useFormik } from 'formik'
export const metadata: Metadata = {
  title: 'Signup Page | Next.js E-commerce Dashboard Template',
  description: 'This is Signup page for TailAdmin Next.js'
  // other metadata
}

export default function SignUp() {
  return (
    <>
      <SignupComponent email='' password='' retypePassword='' fullName='' />
    </>
  )
}

