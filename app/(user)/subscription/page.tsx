


import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import Link from 'next/link'
import { StatusToggle } from '@/components/PaymentMethods/StatusToggle'
import { formatDistanceToNow } from 'date-fns'
import { actionGetProjectDeployment } from '@/app/(user)/customers/[id]/projects/[projectId]/deployment/actions'
import { actionGetSubscription } from '@/app/(user)/subscription/actions'
import { toast } from 'react-hot-toast'

const SubscriptionPage = async ({ searchParams }: {
  searchParams?: {
    keyword?: string
    page?: string
  }
}) => {
  const keyword = searchParams?.keyword || ''
  const currentPage = Number(searchParams?.page) - 1 || 0;

  const response = await actionGetSubscription(currentPage);
  if (!response.ok) {
    toast.error('Get subscription fail');
  }
  const subscriptionList = await response?.json()

  return (
    <>
      <Breadcrumb pageName='Blogs' fullPageName='' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Service</h5>
              </div>
              <div className="p-2.5 text-left xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Term Length</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Enabled</h5>
              </div>
              <div className="p-2.5 text-leftt xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Term</h5>
              </div>

              <div className="hidden p-2.5 text-leftt sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Paid</h5>
              </div>

              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Created At</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
              </div>
            </div>

            {subscriptionList &&
              (subscriptionList?.data || []).map((subscription: any, index: number) => (
                <div
                  className={`grid grid-cols-8 sm:grid-cols-8 ${
                    index === subscriptionList?.data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={index}
                >
                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black dark:text-white sm:block'>{subscription?.serviceId ?? ''}</p>
                  </div>

                  <div className='flex items-center text-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black  text-center dark:text-white sm:block'>{subscription?.termLength ?? ''}</p>
                  </div>
                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p
                      className='hidden text-black dark:text-white sm:block'>{subscription?.enabled ? 'TRUE' : 'FALSE'}</p>
                  </div>

                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black dark:text-white sm:block'>{subscription?.term ?? ''}</p>
                  </div>


                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p
                      className='hidden text-black dark:text-white sm:block'>{subscription?.paid ? 'TRUE' : 'FALSE'}</p>
                  </div>

                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black dark:text-white sm:block'>{subscription?.amount ?? ''}</p>
                  </div>

                  <div className='flex items-center gap-2 justify-center'>
                    <p className='text-meta-3 text-left'>
                      {subscription.createdAt
                        ? formatDistanceToNow(new Date(subscription.createdAt), { addSuffix: true })
                        : 'Not yet'}
                    </p>
                  </div>

                  <div className='hidden items-center gap-2 justify-center p-2.5 sm:flex xl:p-5'>
                    <div className='text-meta-5 flex'>
                      <Link className='inline-block' href={`/subscription/${subscription?.id ?? ''}`}>
                        <button
                          className='flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray'>
                          View detail
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

export default SubscriptionPage