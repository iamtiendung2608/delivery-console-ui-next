import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import Pagination from '@/app/_components/paging/Pagination'
import { actionGetOrdersEmployee } from '@/app/employee/assigned-order/actions'
import { actionGetAssignedOrder } from '@/app/employee/order/actions'
import PopupButton from '@/components/Employee/PopupButton'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'This is Tables page for ...'
}

const AssignedOrderPage = async ({
  searchParams
}: {
  searchParams?: {
    keyword?: string
    page?: string
  }
}) => {
  const keyword = searchParams?.keyword || ''
  const currentPage = Number(searchParams?.page) - 1 || 0

  const items = await actionGetAssignedOrder(keyword, currentPage);

  return (
    <>
      <Breadcrumb pageName='Orders' fullPageName='' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
              </div>
              <div className="p-2.5 text-left xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Total Weight</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Total Price</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Delivery Type</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Created</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
              </div>
            </div>
            <Suspense fallback={<>...</>}>
              <Items items={items} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

function Items({ items }: { items: any }) {
  return (
    <>
      {items &&
        (items?.content || []).map((item: any, index: number) => (
          <div
            className={`grid grid-cols-8 sm:grid-cols-8 ${
              item?.id === items?.totalElements - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={index}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">{item.id}</p>
            </div>

            <div className="flex items-center justify-left p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.status}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.totalWeight}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.totalPrice}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.deliveryType}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-meta-3">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <Link className="inline-block" href={`/order/${item.id}`}>
                  <button className="flex w-full justify-center rounded bg-graydark px-2 py-1 font-medium text-gray">
                    View Detail
                  </button>
                </Link>
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <PopupButton id={Number(item.id)} status={item.status} path="/employee/order" />
              </p>
            </div>
          </div>
        ))}
      <div className="grid grid-cols-2">
        <div className="mt-3 text-left">
        </div>
        <div className="mt-3 text-right">
          <Pagination totalPages={items?.totalPages} />
        </div>
      </div>
    </>
  )
}

export default AssignedOrderPage
