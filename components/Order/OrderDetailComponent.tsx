'use client';

import { FC, useEffect, useState } from 'react'

import { actionGetOrderDetail, actionGetOrderTransaction } from '@/app/(user)/order/[id]/actions'
import { TransferObjectRequest } from '@/components/Order/FormAddOrder'
import TransactionComponent from '@/components/Order/TransactionComponent'
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}



const OrderDetailComponent: FC<{ id: string }> = ({ id }) => {

  const [order, setOrder] = useState(null);
  const [transactions, setTransactions] = useState<TransferObjectRequest[]>([]);

  useEffect(() => {
    if (id) {
      ;(async () => {
        setOrder(await actionGetOrderDetail(id));
        setTransactions(await actionGetOrderTransaction(id));
      })()
    }
  }, [id])

  console.log(order);

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 bg-white">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      {order?.totalPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                      Paid
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-500">Delivery type: {order?.deliveryType}</dd>
                  </div>

                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6 mb-4">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">Paid by {order?.paidType}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Invoice */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16 bg-white">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Created At</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time dateTime={order?.createdAt} className="font-medium text-gray-900">
                      {formatDate(order?.createdAt)}
                    </time>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-500">Due on</dt>{' '}
                  <dd className="inline text-gray-700">
                    <time dateTime={order?.estimatedDeliveryAt} className="font-medium text-gray-900">
                      {formatDate(order?.estimatedDeliveryAt)}
                    </time>
                  </dd>
                </div>
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">From</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">{order?.sender?.customer?.fullName}</span>
                    <br />
                    7363 Cynthia Pass
                    <br />
                    Toronto, ON N3Y 4H8
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">To</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">{order?.receiver?.customer?.fullName}</span>
                    <br />
                    886 Walter Street
                    <br />
                    New York, NY 12345
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                <tr>
                  <th scope="col" className="px-0 py-3 font-semibold">
                    Item
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Weight
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                    Price
                  </th>
                </tr>
                </thead>
                <tbody>
                {order?.orderItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">{item?.item?.name}</div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {formatWeight(item?.item?.weight)}
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {item?.quantity}
                    </td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      {item?.item?.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </td>
                  </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                  <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                    Subtotal
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Subtotal
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                    {order?.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                    Tax
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Tax
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
                    {order?.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                    Total
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                  >
                    Total
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                    {order?.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>

            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 bg-white">
              {/* Activity feed */}
              <div className="mt-4 ml-4 mr-2 mb-4 rounded-lg">
                <h2 className="text-sm font-semibold leading-6 text-gray-900">Transaction</h2>
                <ul role="list" className="mt-6 space-y-6">
                  {transactions.map((activityItem, activityItemIdx) => (
                    <li key={activityItem.id} className="relative flex gap-x-4">
                      <div
                        className={classNames(
                          activityItemIdx === transactions.length - 1 ? 'h-6' : '-bottom-6',
                          'absolute left-0 top-0 flex w-6 justify-center'
                        )}
                      >
                        <div className="w-px bg-blue-200" />
                      </div>
                      <>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                          {activityItem.status === 'DELIVERED' ? (
                            <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                          ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                          )}
                        </div>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activityItem.employee ? `${activityItem.employee.name} ${activityItem.status} the invoice.` : 'ORDER CREATED'}
                          </span>{' '}
                        </p>
                      </>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


const items = [
  { id: 1 }
  // More items...
]

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatWeight(quantity) {
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(2)} kg`; // Convert to kilograms
  } else {
    return `${quantity} gam`; // Display as gram
  }
}

export default OrderDetailComponent;
