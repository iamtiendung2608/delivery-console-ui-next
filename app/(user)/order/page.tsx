import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import Pagination from '@/app/_components/paging/Pagination'
import { StatusToggle } from '@/components/PaymentMethods/StatusToggle'
import { Button } from '@/app/_components/button'
import { actionGetOrders } from '@/app/(user)/order/actions'

export const metadata: Metadata = {
  title: 'Customer',
  description: 'This is Tables page for ...'
}



const OrderPage = async ({
  searchParams
}: {
  searchParams?: {
    keyword?: string
    page?: string
  }
}) => {
  const keyword = searchParams?.keyword || ''
  const currentPage = Number(searchParams?.page) - 1 || 0

  const items = await actionGetOrders(keyword, currentPage);

  return (
    <>
      <Breadcrumb pageName='Customers' fullPageName='' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
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
            className={`grid grid-cols-7 sm:grid-cols-7 ${
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
                  <button className="flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray">
                    View Detail
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ))}
      <div className="grid grid-cols-2">
        <div className="mt-3 text-left">
          <Link href={'/promotion/add'} passHref>
            <Button>Add New Order</Button>
          </Link>
        </div>
        <div className="mt-3 text-right">
        <Pagination totalPages={items?.totalPages} />
        </div>
      </div>
    </>
  )
}

export default OrderPage
