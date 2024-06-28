import { BRAND } from '@/types/brand'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ECommerceProps } from '@/components/Dashboard/E-commerce'
import { getAdminChart, getAdminTop, getUserChart, getUserTop } from '@/app/admin/actions'
import { DeliveryType, OrderStatus } from '@/components/TransferObject/CommodityInformationComponent'
import { formatDistanceToNow } from 'date-fns'

const brandData: BRAND[] = []


export interface OrderResponse {
  id: number
  status: OrderStatus
  totalWeight: number
  totalPrice: number
  feePaid: number
  subTotal: number
  deliveryAt: string
  deliveryType: DeliveryType
  createdAt: string
}


export interface OrderDetailResponse {
  response: OrderResponse[]
}

const TableOne: React.FC<ECommerceProps> = ({ role }) => {

  const [order, setOrder] = useState<OrderDetailResponse>()

  useEffect(() => {
    if (role) {
      (async () => {
        if (role === 'super_admin') {
          const response = await getAdminTop();
          setOrder(response);
        } else if (role === 'user') {
          const response = await getUserTop();
          setOrder(response);
        } else {
        }
      })();
    }
  }, [role]);


  return (
    <div className='w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <h4 className='mb-6 text-xl font-semibold text-black dark:text-white'>Top Order</h4>

      <div className='flex flex-col'>
        <div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5'>
          <div className='p-2.5 xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>ID</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Status</h5>
          </div>
          <div className='p-2.5 text-center xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Weight</h5>
          </div>
          <div className='hidden p-2.5 text-center sm:block xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Total Price</h5>
          </div>
          <div className='hidden p-2.5 text-center sm:block xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>Created At</h5>
          </div>
        </div>

        {order?.response.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className='flex items-center gap-3 p-2.5 xl:p-5'>
              <p className='hidden text-black dark:text-white sm:block'>{brand.id}</p>
            </div>

            <div className='flex items-center justify-center p-2.5 xl:p-5'>
              <p className='text-black dark:text-white'>{brand.status}</p>
            </div>

            <div className='flex items-center justify-center p-2.5 xl:p-5'>
              <p className='text-black dark:text-white'>{brand?.totalWeight ? `${brand?.totalWeight.toLocaleString()} g` : '0 g'}</p>
            </div>

            <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
              <p className='text-meta-3'>{brand?.totalPrice ? `${brand?.totalPrice.toLocaleString()} VND` : '0 VND'}</p>
            </div>

            <div className='hidden items-center justify-center p-2.5 sm:flex xl:p-5'>
              <p className='text-meta-5'>
                {formatDistanceToNow(new Date(brand.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableOne
