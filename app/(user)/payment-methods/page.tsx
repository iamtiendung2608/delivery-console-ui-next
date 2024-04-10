import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import Link from 'next/link'
import { StatusToggle } from '@/components/PaymentMethods/StatusToggle'

const PaymentMethods = async ({ searchParams }: {
  searchParams?: {
    keyword?: string
    page?: string
  }
}) => {
  const keyword = searchParams?.keyword || ''

  const data = await fetchWithRetry(`${API_ENDPOINT}/admin/payment/method?keyword=${keyword}`, {
    method: 'GET',
    next: { revalidate: 0 }
  })
  const paymentMethodList = await data?.json()

  return (
    <>
      <Breadcrumb pageName='Blogs' fullPageName='' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4'>
              <div className='p-2.5 xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Id</h5>
              </div>
              <div className='p-2.5 text-center xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Enabled</h5>
              </div>
              <div className='p-2.5 text-center xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Description</h5>
              </div>
              <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Actions</h5>
              </div>
            </div>

            {paymentMethodList &&
              (paymentMethodList || []).map((paymentMethod: any, index: number) => (
                <div
                  className={`grid grid-cols-4 sm:grid-cols-4 ${
                    index === paymentMethodList.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={index}
                >
                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black dark:text-white sm:block'>{paymentMethod?.id ?? ''}</p>
                  </div>

                  <div className='flex items-center gap-2 justify-center p-2.5 xl:p-5'>
                    <StatusToggle paymentMethodId={paymentMethod.id} enabled={paymentMethod?.enabled} />
                  </div>

                  <div className='flex items-center gap-2 justify-center p-2.5 xl:p-5'>
                    <p className='text-meta-3'>{paymentMethod?.description ?? ''}</p>
                  </div>

                  <div className='hidden items-center gap-2 justify-center p-2.5 sm:flex xl:p-5'>
                    <div className='text-meta-5 flex'>
                      <Link className='mr-1 inline-block' href={`/payment-methods/${paymentMethod?.id ?? ''}`}>
                        <button className='flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray'>
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethods