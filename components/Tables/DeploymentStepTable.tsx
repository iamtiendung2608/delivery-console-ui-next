'use client';

import * as React from 'react';

export default function DeploymentStepsTable({ items }: { items: any }) {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Step Order
            </th>
            <th scope="col" className="px-6 py-3">
              Job Name
            </th>
            <th scope="col" className="px-6 py-3">
              Queue ID
            </th>
          </tr>
          </thead>

          <tbody>
          {items &&
            items.map((item: any, index: number) => (
              <tr
                key={index} // Adding a unique key for each row
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.type} {/* Fill in with the actual data */}
                </td>
                <td className="px-6 py-4">{item.status}</td> {/* Fill in with the actual data */}
                <td className="px-6 py-4">{item.stepOrder}</td> {/* Fill in with the actual data */}
                <td className="px-6 py-4">{item.jobName}</td> {/* Fill in with the actual data */}
                <td className="px-6 py-4">{item.queueId}</td> {/* Fill in with the actual data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
