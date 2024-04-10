import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import SigninComponent from '@/components/Auth/SigninComponent'
export const metadata: Metadata = {
  title: 'Signin Page | Next.js E-commerce Dashboard Template',
  description: 'This is Signin page for TailAdmin Next.js'
  // other metadata
}

const SignIn: React.FC = () => {

  return (
    <>
      <SigninComponent email='' password=''/>
    </>
  )
}

export default SignIn
