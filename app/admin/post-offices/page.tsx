import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/app/_components/paging/Pagination'
import { actionGetAdminPostOffices } from '@/app/admin/post-offices/actions'
import { Button } from '@/app/_components/button'
export const metadata: Metadata = {
  title: 'Customer',
  description: 'This is Tables page for ...'
}

const AdminPostOfficesPage = async ({searchParams}: {
  searchParams?: {
    keyword?: string;
    page?: string;
  };
})=> {
  const keyword = searchParams?.keyword || '';
  const currentPage = Number(searchParams?.page) - 1 || 0;
  const response = await actionGetAdminPostOffices(keyword, currentPage);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Post Offices</h1>
            <p className="mt-2 text-sm text-gray-700">
              List of post offices
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
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Sponsor
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.address}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.sponsor}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                        <Link href={`/admin/post-offices/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {item.fullName}</span>
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
            <Link href={'/admin/post-offices/add'} passHref>
              <Button>Add New Post Offices</Button>
            </Link>
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
