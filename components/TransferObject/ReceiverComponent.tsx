'use client';

import { date } from 'yup'
import { FC, useEffect, useState } from 'react'
import { FormAddCustomerRequest } from '@/components/Customers/FormAddCustomer'
import { actionGetSingleTransferObject } from '@/app/(user)/order/single-form/actions'
import CheckboxTwo from '@/components/Checkboxes/CheckboxTwo'
import CustomerComponent from '@/components/Customers/CustomerComponent'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export interface ReceiverObjectRequest {
  id: number
  atOfficeFlg: boolean,
  receiveShift: ReceiveShift,
  customerId: number,
  postOfficeId: number | null,
  actionDate: Date
}

export enum ReceiveShift {
  ALL_DAY = 'Everytime in day',
  MORNING = 'Morning (7 AM to 11 AM)',
  AFTERNOON = 'Afternoon (1 PM to 4:59 PM)',
  NIGHT = 'Night (6 PM to 9 PM)',
  WORK_HOUR = 'WORK_HOUR (7 AM to 6 PM)',
  WEEKEND = 'WEEKEND (Saturday and Sunday)',
  HOLIDAY = 'On Holiday'
}

const getInitialValues = (formData?: ReceiverObjectRequest | null): ReceiverObjectRequest => {
  return formData ?? {
    id: 0,
    atOfficeFlg: false,
    receiveShift: ReceiveShift.ALL_DAY,
    customerId: 0,
    postOfficeId: null,
    actionDate: new Date()
  };
};


const ReceiverComponent: FC<{ id: number | null, editAction: boolean}> = ({ id, editAction }) => {
  const [receiver, setReceiver] = useState<ReceiverObjectRequest>(getInitialValues(null));
  const [receiverLocationId, setReceiverLocationId] = useState<number>(0);
  const handleReceiverLocationChange = (id: number) => {
    setReceiverLocationId(id);
  };


  useEffect(() => {
    ;(async () => {
      if (id) {
        const response = await actionGetSingleTransferObject(id);
        setReceiver({
          id: response.id,
          atOfficeFlg: response.atOfficeFlg,
          receiveShift: response.receiveShift,
          customerId: response.customer?.id,
          postOfficeId: response.postOffice?.id,
          actionDate: response.actionDate
        });
        setReceiverLocationId(response.customer?.id);
      } else {
        setReceiver(getInitialValues(null));
      }
    })()
  }, [id]) // Add id as a dependency for useEffect


  const formik = useFormik<ReceiverObjectRequest>({
    initialValues: receiver,
    onSubmit: async (values, { resetForm }) => {

    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Name is required')
    })
  });




  return (
    <>
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

          <div className="mb-2">
            <CheckboxTwo name="Recieve at post offices" />
          </div>

          <div className="mb-2">
            <label className="mb-3 block font-medium text-black dark:text-white">Receive Shift</label>
            <select
              id="category"
              name="category"
              autoComplete="country-name"
              className="block w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" // Add bg-transparent class for consistency
            >
              {getEnumKeys(ReceiveShift).map((key, index) => (
                <option key={index} value={key}>
                  {ReceiveShift[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <CustomerComponent onLocationChange={handleReceiverLocationChange} customerId={null} label="Select receiver information" />
          </div>
        </div>
      </div>
    </>
  )
}


function getEnumKeys<
  T extends string,
  TEnumValue extends string | number,
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>
}


export default ReceiverComponent;
