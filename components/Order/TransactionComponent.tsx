'use client';

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { actionGetOrderDetail, actionGetOrderTransaction } from '@/app/(user)/order/[id]/actions'
import { formatDistanceToNow } from 'date-fns'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export interface TransactionComponentProps {
  id: string
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    if (id) {
      ;(async () => {
        setTransactions(await actionGetOrderTransaction(id));
      })()
    }
  }, [id])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-1">
        <div className="">
          <h2 className="text-sm font-semibold leading-6 text-gray-900">Transaction History</h2>
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
                      {activityItem?.employee?.name ? ` ${activityItem?.employee?.name} ${activityItem?.status} the order.` : 'ORDER CREATED'}
                    </span>{' '}
                  </p>
                  <time
                    dateTime={activityItem?.createdAt}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {formatDistanceToNow(new Date(activityItem?.createdAt), { addSuffix: true })}
                  </time>
                </>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default TransactionComponent