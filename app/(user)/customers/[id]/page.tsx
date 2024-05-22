import FormAddCustomer, { FormAddCustomerRequest } from '@/components/Customers/FormAddCustomer'
import { actionGetCustomers } from '@/app/(user)/customers/actions'
import { GetStaticPropsContext } from 'next'
import { actionGetCustomerDetail } from '@/app/(user)/customers/[id]/actions'

export interface CustomerDetail {
  id: number
  fullName: string
  phone: string
  address: string
  email: string
  location: LocationResponse
}

export interface LocationResponse {
  id: number
  province: string
  district: string
  ward: string
}

const CustomerDetail = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;

  const customer = await actionGetCustomerDetail(id);
  const formAddCustomer = {
    id: customer.id,
    fullName: customer.fullName,
    phone: customer.phone,
    address: customer.address,
    locationTagId: customer.location.id,
    email: customer.email
  }

  return (
    <>
      <FormAddCustomer formAddCustomer={formAddCustomer} editAction={true}/>
    </>
  )
}

export default CustomerDetail;