'use client';
/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
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

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}
const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selected, setSelected] = useState(moods[5])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <div className="">
            {/* Activity feed */}
            <h2 className="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
            <ul role="list" className="mt-6 space-y-6">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                  <div
                    className={classNames(
                      activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                      'absolute left-0 top-0 flex w-6 justify-center'
                    )}
                  >
                    <div className="w-px bg-blue-200" />
                  </div>
                  {activityItem.type === 'commented' ? (
                    <>
                      <img
                        src={activityItem.person.imageUrl}
                        alt=""
                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                        <div className="flex justify-between gap-x-4">
                          <div className="py-0.5 text-xs leading-5 text-gray-500">
                            <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                          </div>
                          <time
                            dateTime={activityItem.dateTime}
                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                          >
                            {activityItem.date}
                          </time>
                        </div>
                        <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                        {activityItem.type === 'paid' ? (
                          <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                        )}
                      </div>
                      <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">{activityItem.person.name}</span>{' '}
                        {activityItem.type} the invoice.
                      </p>
                      <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {activityItem.date}
                      </time>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
