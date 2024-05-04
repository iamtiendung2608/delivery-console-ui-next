import FormAddCustomer, { FormAddCustomerRequest } from '@/components/Customers/FormAddCustomer'


const formAddCustomer: FormAddCustomerRequest = {
  id: 0,
  fullName: '',
  email: '',
  phone: '',
  address: '',
  locationTagId: 0
}
const AddCustomers = async () => {
  return (
    <>
      <FormAddCustomer formAddCustomer={formAddCustomer} editAction={false}/>
    </>
  )
}

export default AddCustomers;