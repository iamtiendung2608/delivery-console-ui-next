import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import Pagination from '@/app/_components/paging/Pagination'
import { actionGetSubscriptionPlan } from '@/app/(user)/subscription/plan/actions'
import { toast } from 'react-hot-toast'
export const metadata: Metadata = {
  title: 'Subscription plan',
  description: 'This is Tables page for ...'
}

const SubscriptionPlanPage = async ({searchParams}: {
  searchParams?: {
    keyword?: string;
    page?: string;
  };
})=> {
  const keyword = searchParams?.keyword || '';
  const currentPage = Number(searchParams?.page) - 1 || 0;

  const response = await actionGetSubscriptionPlan(currentPage);
  if (!response.ok) {
    toast.error("Get subscription plan fail");
  }
  const subscriptionPlanList = await response?.json();

  return (
    <>
      <Breadcrumb pageName='Subscription plan' fullPageName='Subscription plan' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
              </div>
              <div className="p-2.5 text-left xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Code</h5>
              </div>
              <div className="p-2.5 text-left xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Term</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Length</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Service</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Amount</h5>
              </div>
              <div className="hidden p-2.5 text-left sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
              </div>
            </div>
            <Suspense fallback={<>...</>}>
              <Items items={subscriptionPlanList} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

function Items(items: any) {
  console.log(items);
  return (
    <>
      {items &&
        (items?.items.data || []).map((item: any, index: number) => (
          <div
            className={`grid grid-cols-7 sm:grid-cols-7 ${
              item?.id === items?.items.data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={index}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">{item?.id}</p>
            </div>

            <div className="flex items-center justify-left p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item?.code}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item?.term}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item?.termLength}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item?.serviceSpecification?.serviceId}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{item?.amount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <Link className="inline-block" href={`/subscription/plan/${item.id}`}>
                  <button className="flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray">
                    View Details
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ))}

      <div className="grid grid-cols-2">
        <div className="mt-3 text-left">
        </div>
        <div className="mt-3 text-right">
          <Pagination totalPages={items?.total} />
        </div>
      </div>
    </>
  )
}

export default SubscriptionPlanPage;
