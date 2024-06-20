import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/app/_components/paging/Pagination'
import { actionGetAdminPostOffices } from '@/app/admin/post-offices/actions'
import { actionGetOrders } from '@/app/(user)/order/actions'
import { actionGetAdminOrders } from '@/app/admin/order/actions'
import { formatDistanceToNow } from 'date-fns'
export const metadata: Metadata = {
  title: 'Orders',
  description: 'This is Tables page for ...'
}

const AdminPostOfficesPage = async ({searchParams}: {
  searchParams?: {
    keyword?: string;
    page?: string;
  };
})=> {
  const currentPage = Number(searchParams?.page) - 1 || 0;
  const response = await actionGetAdminOrders(currentPage);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Order</h1>
            <p className="mt-2 text-sm text-gray-700">
              List of orders
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total Weight
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delivery Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  {response.content.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.status}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.totalWeight} (g)</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.totalPrice} (vnd)</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.deliveryType}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                        <Link href={`/order/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                          View Detail<span className="sr-only">, {item.fullName}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mt-3 text-left">

          </div>
          <div className="mt-3 text-right">
            <Pagination totalPages={response?.totalPages} />
          </div>
        </div>
      </div>
    </>
  )
}


export default AdminPostOfficesPage
