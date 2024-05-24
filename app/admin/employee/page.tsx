import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/app/_components/paging/Pagination'
import { actionGetPostOffices } from '@/app/(user)/post-offices/actions'
import { formatDistanceToNow } from 'date-fns'
import { actionGetAdminEmployee } from '@/app/admin/employee/actions'
import { EmployeeStatusToggle } from '@/components/Admin/EmployeeStatusToggle'
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
  const response = await actionGetAdminEmployee(keyword, currentPage);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Employees</h1>
            <p className="mt-2 text-sm text-gray-700">
              List of Employee
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
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <EmployeeStatusToggle employeeId={item.id} active={item?.active} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                        <Link href={`/admin/employee/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {item.id}</span>
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
            <Link href={'/admin/employee/add'} passHref>
              <Button>Add New Employee</Button>
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
