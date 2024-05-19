

import { Metadata } from 'next'
import FormAddOrder from '@/components/Order/FormAddOrder'
import { actionGetCustomers } from '@/app/(user)/customers/actions'
export const metadata: Metadata = {
  title: 'Form Elements Page | Next.js E-commerce Dashboard Template',
  description: 'This is Form Elements page for TailAdmin Next.js'
  // other metadata
}


const FormAddOrderElements = async () => {

  const customers = await actionGetCustomers('', 0);
  return (
    <>
      <FormAddOrder id={null} editAction={false} customers={customers}/>
    </>
  )
}

export default FormAddOrderElements
