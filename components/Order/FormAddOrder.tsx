'use client'


import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import {
  CreateOrderRequest,
  DeliveryType,
  OrderStatus,
  PaidType
} from '@/components/TransferObject/CommodityInformationComponent'
import React, { FC, useState } from 'react'
import { useFormik } from 'formik'
import { actionAddOrder, actionAddTransferObject } from '@/app/(user)/order/single-form/add/actions'
import * as Yup from 'yup'
import moment from 'moment/moment'
import CheckboxTwo from '@/components/Checkboxes/CheckboxTwo'
import SelectComponent from '@/components/Select/SelectComponent'
import CustomerSelectComponent from '@/components/Customers/SelectCustomerComponent'
import CommodityItem, { Item, ItemCategory } from '@/components/TransferObject/CommodityItem'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Toaster } from 'react-hot-toast'

const getInitialTransferObject = (formData?: TransferObjectRequest | null): TransferObjectRequest => {
  return formData ?? {
    id: 0,
    atOfficeFlg: false,
    receiveShift: ReceiveShift.ALL_DAY,
    customerId: 0,
    postOfficeId: null,
    actionDate: ''
  };
};

export interface TransferObjectRequest {
  id: number
  atOfficeFlg: boolean,
  receiveShift: ReceiveShift,
  customerId: number,
  postOfficeId: number | null,
  actionDate: string
}

export interface TransferObjectResponse {
  id: number
}

enum ReceiveShift {
  ALL_DAY = 'Everytime in day',
  MORNING = 'Morning (7 AM to 11 AM)',
  AFTERNOON = 'Afternoon (1 PM to 4:59 PM)',
  NIGHT = 'Night (6 PM to 9 PM)',
  WORK_HOUR = 'WORK_HOUR (7 AM to 6 PM)',
  WEEKEND = 'WEEKEND (Saturday and Sunday)',
  HOLIDAY = 'On Holiday'
}

const getInitialValues = (formData?: CreateOrderRequest | null): CreateOrderRequest => {
  return formData ?? {
    id: 0,
    deliveryType: DeliveryType.NORMAL,
    note: '',
    paidType: PaidType.SENDER,
    status: OrderStatus.CREATED,
    senderObjectId: 0,
    receiverObjectId: 0,
    items: []
  };
};

const FormAddOrder: FC<{ id: number | null, editAction: boolean, customers : []}> = ({ id, editAction, customers }) => {

  const [senderObject, setSenderObject] = useState<TransferObjectRequest>();
  const [receiverObject, setReceiverObject] = useState<TransferObjectRequest>();
  const router = useRouter();

  const senderFormik= useFormik<TransferObjectRequest>({
    initialValues: getInitialTransferObject(senderObject),
    onSubmit: async (values, { resetForm }) => {
      values.actionDate = moment(values.actionDate).format('YYYY-MM-DDTHH:00:00Z');
      if (!editAction) {
        return await actionAddTransferObject(values);
      } else {
        // Handle submission for other cases if needed
      }
    },
    validationSchema: Yup.object({
    })
  });

  const receiverFormik = useFormik<TransferObjectRequest>({
    initialValues: getInitialTransferObject(receiverObject),
    onSubmit: async (values, { resetForm }) => {
      values.actionDate = moment(new Date()).format('YYYY-MM-DDTHH:00:00Z');
      if (!editAction) {
        return await actionAddTransferObject(values);
      } else {
        // Handle submission for other cases if needed
      }
    },
    validationSchema: Yup.object({
    })
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: async (values, { resetForm }) => {
      if (!editAction) {
        return await actionAddOrder(values);
      } else {

      }
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required')
    })
  });

  const [items, setItems] = useState<Item[]>([{id: 0, name: '', itemCategory: ItemCategory.HIGH_VALUE, quantity: 0, weight: 0, price: 0 }]);

  const handleAddItem = () => {
    setItems([...items, {id: 0, name: '', itemCategory: ItemCategory.HIGH_VALUE, quantity: 0, weight: 0, price: 0 }]);
  };

  const handleItemChange = (index: number, updatedItem: Item) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Calculate total weight and total value
  const totalWeight = items.length > 0 ? items.reduce((total, item) => total + Number(item.weight), 0).toLocaleString() : '';
  const totalValue = items.length > 0 ? items.reduce((total, item) => total + Number(item.price), 0).toLocaleString() : '';
  const fee = items.length > 0 ? calculateFeePaid(Number(items.reduce((total, item) => total + Number(item.weight), 0)), formik.values.deliveryType) : 0;

  const handleSubmit = async () => {
    try {
      const senderResponse = await senderFormik.submitForm();
      const receiverResponse = await receiverFormik.submitForm();
      formik.values.receiverObjectId = receiverResponse.id;
      formik.values.senderObjectId = senderResponse.id;
      formik.values.items = items;
      const response = await actionAddOrder(formik.values);

      console.log(response);
      if (!response.error) {
        toast.success('Create order success');
        router.push(`/order`);
        router.refresh();
      } else {
        toast.error('Create order fail');
        return;
      }

    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };


  return (
    <>
      <Breadcrumb pageName='Single Order Form' fullPageName={'Single Order'} />
      <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className="flex flex-col gap-7">
          {/*form 1*/}
          <form onSubmit={senderFormik.handleSubmit}>
            <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-black dark:text-white">User Forward</h3>
                  <div>
                    <svg
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-auto"
                    >
                      <path
                        d="M13.2727 16V14.3333C13.2727 12.4924 11.8075 11 10 11H4.27273C2.46525 11 1 12.4924 1 14.3333V16"
                        stroke="#EE0033"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.13636 7.66667C8.94384 7.66667 10.4091 6.17428 10.4091 4.33333C10.4091 2.49238 8.94384 1 7.13636 1C5.32889 1 3.86364 2.49238 3.86364 4.33333C3.86364 6.17428 5.32889 7.66667 7.13636 7.66667Z"
                        stroke="#EE0033"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M16 10L18 8L16 6" stroke="#EE0033" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" />
                      <path d="M13 8L18 8" stroke="#EE0033" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="mb-2">
                  <CheckboxTwo onChange={e => senderFormik.setFieldValue('atOfficeFlg', e)} name="Send at post offices" />
                </div>

                <div className="mb-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Send Shift</label>
                  <SelectComponent isMulti={false} value={senderFormik.values.receiveShift} options={ReceiveShift}
                                   className=''
                                   onChange={(e) => senderFormik.setFieldValue('receiveShift', e)} />
                </div>

                <div className="mb-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Send on</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name='actionDate'
                      value={senderFormik.values.actionDate}
                      onChange={senderFormik.handleChange}
                      onBlur={senderFormik.handleBlur}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Select sender information</label>
                  <CustomerSelectComponent isMulti={false} value={senderFormik.values.customerId} options={customers}
                                           className=''
                                           onChange={(e) => senderFormik.setFieldValue('customerId', e)} />
                </div>
              </div>
            </div>
          </form>
          {/*/!*form 2*!/*/}
          <form>
            <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-black dark:text-white">User Receive</h3>
                  <div>
                    <div className="ml-auto"> {/* Use ml-auto to move the SVG to the right */}
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2727 16V14.3333C13.2727 12.4924 11.8075 11 10 11H4.27273C2.46525 11 1 12.4924 1 14.3333V16"
                          stroke="#EE0033"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.13636 7.66667C8.94384 7.66667 10.4091 6.17428 10.4091 4.33333C10.4091 2.49238 8.94384 1 7.13636 1C5.32889 1 3.86364 2.49238 3.86364 4.33333C3.86364 6.17428 5.32889 7.66667 7.13636 7.66667Z"
                          stroke="#EE0033"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.0909 7.66667L15.7273 9.33333L19 6"
                          stroke="#EE0033"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">

                <div className="mt-2">
                  <CheckboxTwo onChange={e => receiverFormik.setFieldValue('atOfficeFlg', e)} name="Recieve at post offices" />
                </div>

                <div className="mt-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Receive Shift</label>
                  <SelectComponent isMulti={false} value={receiverFormik.values.receiveShift} options={ReceiveShift}
                                   className=''
                                   onChange={(e) => receiverFormik.setFieldValue('receiveShift', e)} />
                </div>

                <div className="mt-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Select receiver
                    information</label>
                  <CustomerSelectComponent isMulti={false} value={receiverFormik.values.customerId} options={customers}
                                           className=''
                                           onChange={(e) => receiverFormik.setFieldValue('customerId', e)} />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/*form 2*/}
        <div className="flex flex-col gap-9">
          <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-black dark:text-white">Commodity Information</h3>
                <div>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto" // Add this class to move the SVG to the right
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.8618 1.32725L14.6372 4.23634C15.1279 4.48196 15.4382 4.9862 15.4385 5.53816V12.4691C15.4382 13.021 15.1279 13.5253 14.6372 13.7709L8.8618 16.68C8.45509 16.885 7.97626 16.885 7.56955 16.68L1.79415 13.7709C1.30396 13.5221 0.996215 13.0147 1.00004 12.4618V5.53816C1.00033 4.9862 1.31071 4.48196 1.80137 4.23634L7.57677 1.32725C7.98151 1.12464 8.45706 1.12464 8.8618 1.32725Z"
                      stroke="#EE0033"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.23108 4.75269L8.21931 8.27269L15.2076 4.75269"
                      stroke="#EE0033"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.2193 16.8254V8.27271"
                      stroke="#EE0033"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.60968 2.81818L11.8289 6.45454"
                      stroke="#EE0033"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {items.map((item, index) => (
                <CommodityItem
                  key={index}
                  item={item}
                  onChange={(updatedItem) => handleItemChange(index, updatedItem)}
                  onRemove={items.length > 1 ? () => handleRemoveItem(index) : undefined}
                />
              ))}
              <div className="grid grid-cols-2">
                <div className="mt-5 text-left">
                  {totalWeight && <p>Total Weight: {totalWeight}</p>}
                  {totalValue && <p>Sub Total: {totalValue}</p>}
                  {fee && <p>Ship Fee: {formatToVND(fee)}</p>}
                </div>
                <div className="mt-5 text-right">
                  <button
                    onClick={handleAddItem}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Add more items
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-black dark:text-white">Delivery information</h3>
                <div className="ml-auto"> {/* Use ml-auto to move the SVG to the right */}
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="13.6364"
                      height="11.5556"
                      stroke="#EE0033"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6364 5.44446H18.2727L21 8.11112V12.5556H14.6364V5.44446V5.44446Z"
                      stroke="#EE0033"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.09091 17C6.3461 17 7.36364 16.0051 7.36364 14.7778C7.36364 13.5505 6.3461 12.5555 5.09091 12.5555C3.83572 12.5555 2.81818 13.5505 2.81818 14.7778C2.81818 16.0051 3.83572 17 5.09091 17Z"
                      stroke="#EE0033"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.9091 17C18.1643 17 19.1818 16.0051 19.1818 14.7778C19.1818 13.5505 18.1643 12.5555 16.9091 12.5555C15.6539 12.5555 14.6364 13.5505 14.6364 14.7778C14.6364 16.0051 15.6539 17 16.9091 17Z"
                      stroke="#EE0033"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5.5 p-6.5">

                <div className="mb-2">
                  <div className="mb-2">
                    <label className="mb-3 block font-medium text-black dark:text-white">Delivery Type</label>
                    <SelectComponent isMulti={false} value={formik.values.deliveryType} options={DeliveryType}
                                     className=""
                                     onChange={(e) => formik.setFieldValue('deliveryType', e)} />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="mb-2">
                    <label className="mb-3 block font-medium text-black dark:text-white">Paid Type</label>
                    <SelectComponent isMulti={false} value={formik.values.paidType} options={PaidType} className=""
                                     onChange={(e) => formik.setFieldValue('paidType', e)} />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="mb-3 block font-medium text-black dark:text-white">Note</label>
                  <textarea
                    rows={3}
                    placeholder="Input note"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-3 gap-9 sm:grid-cols-3">
              <div className="ml-5.5 content-center justify-center">

              </div>
              <div className="ml-5.5 content-center justify-center">

              </div>
              <div className="ml-5.5">
                <button
                  className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                  type="submit" onClick={handleSubmit}>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

function calculateFeePaid(totalWeight: number, type: DeliveryType) {
  let baseFee = (type === DeliveryType.NORMAL ? 11000 : 15000);

  if (totalWeight > 500) {
    // Additional 10k for objects over 500g
    baseFee += 10000;
  }
  if (totalWeight > 2000) {
    // Additional 2k for each 0.5kg over 2000g
    baseFee += Math.ceil((totalWeight - 2000) / 500) * 2000;
  }
  return baseFee;
}


function formatToVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
export default FormAddOrder;
