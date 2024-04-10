import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import FormEditPaymentMethod from '@/components/PaymentMethods/FormEditPaymentMethod'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import { GetStaticPropsContext, Metadata } from 'next'
import { actionEditPaymentMethod } from './actions'
export const metadata: Metadata = {
  title: 'Settings Page | Next.js E-commerce Dashboard Template',
  description: 'This is Settings page for TailAdmin Next.js'
  // other metadata
}

const EditPaymentMethod = async (context: GetStaticPropsContext) => {
  const paymentMethodId = context?.params?.id as string
  const data = await fetchWithRetry(`${API_ENDPOINT}/admin/payment/method/${paymentMethodId}`, {
    method: 'GET',
    next: { revalidate: 0 }
  })
  const paymentMethodDetail = await data?.json()

  return (
    <>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName={paymentMethodDetail?.id ?? ''} fullPageName='Edit Payment Method' />

        <div className='grid grid-cols-2 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>Payment method Information</h3>
              </div>
              <div className='p-7'>
                <FormEditPaymentMethod
                  paymentMethodDetail={paymentMethodDetail}
                  actionEditPaymentMethod={actionEditPaymentMethod.bind(this, paymentMethodId)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPaymentMethod
