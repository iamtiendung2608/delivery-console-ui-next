import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import CheckboxFive from '@/components/Checkboxes/CheckboxFive'
import CheckboxFour from '@/components/Checkboxes/CheckboxFour'
import CheckboxOne from '@/components/Checkboxes/CheckboxOne'
import CheckboxThree from '@/components/Checkboxes/CheckboxThree'
import CheckboxTwo from '@/components/Checkboxes/CheckboxTwo'


import { Metadata } from 'next'
import CustomerComponent from '@/components/Customers/CustomerComponent'
import ReceiverComponent from '@/components/TransferObject/ReceiverComponent'
export const metadata: Metadata = {
  title: 'Form Elements Page | Next.js E-commerce Dashboard Template',
  description: 'This is Form Elements page for TailAdmin Next.js'
  // other metadata
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

const FormElements = () => {
  // move to client component
  // const [receiverLocationId, setReceiverLocationId] = useState<number>(0);
  // const [senderLocationId, setSenderLocationId] = useState<number>(0);
  //
  // const handleReceiverLocationChange = (id: number) => {
  //   setReceiverLocationId(id);
  // };
  //
  // const handleSenderLocationChange = (id: number) => {
  //   setSenderLocationId(id);
  // };



  return (
    <>
      <Breadcrumb pageName='Single Order Form' fullPageName={'Single Order'} />

      {/*form 1*/}
      <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className="flex flex-col gap-7">
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
                    className="ml-auto" // Add this class to move the SVG to the right
                  >
                    <path
                      d="M13.2727 16V14.3333C13.2727 12.4924 11.8075 11 10 11H4.27273C2.46525 11 1 12.4924 1 14.3333V16"
                      stroke="#EE0033"
                      strokeWidth="2" // Change "stroke-width" to "strokeWidth"
                      strokeLinecap="round" // Change "stroke-linecap" to "strokeLinecap"
                      strokeLinejoin="round" // Change "stroke-linejoin" to "strokeLinejoin"
                    />
                    <path
                      fillRule="evenodd" // Change "fill-rule" to "fillRule"
                      clipRule="evenodd" // Change "clip-rule" to "clipRule"
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
                <CheckboxTwo name="Send at post offices" />
              </div>

              <div className="mb-2">
                <label className="mb-3 block font-medium text-black dark:text-white">Send Shift</label>
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
                <label className="mb-3 block font-medium text-black dark:text-white">Send on</label>
                <div className="relative">
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" // Add bg-transparent class for consistency
                  />
                </div>
              </div>

              <div className="mb-2">
                <CustomerComponent onLocationChange={null} customerId={null} label="Select sender information" />
              </div>

            </div>
          </div>

          {/*form 2*/}

          <ReceiverComponent id={null} editAction={true}/>
        </div>

        {/*form 3*/}
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
              <div className="mb-3">
                <div className="flex gap-9 mb-5">
                  <div className="flex-none w-14">
                    <label className="mt-2 block text-black dark:text-white">Item 1</label>
                  </div>
                  <div className="flex-initial w-full">
                    <input
                      type="text"
                      required={true}
                      placeholder="Input Item's name"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-none w-24">
                  </div>
                  <div className="grid grid-cols-4 gap-9">
                    <div className="w-32">
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-32 ml-8">
                      <input
                        type="number"
                        placeholder="Weight"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-40 ml-16">
                      <input
                        type="number"
                        placeholder="Item value"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="mt-5 text-left"></div>
                  <div className="mt-5 text-right">
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Add more items
                    </button>
                  </div>
                </div>

                <hr className="border-black dark:border-white mt-3" />

                <div className="grid grid-cols-2">
                  <div className="mt-5 text-left">
                    Total Weight:
                  </div>
                  <div className="mt-5 text-right">
                    0 g
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="mt-5 text-left">
                    Total Value:
                  </div>
                  <div className="mt-5 text-right">
                    0 vnd
                  </div>
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
            <div className="flex flex-col gap-5.5 p-6.5">

              <div>
                <div className="grid grid-cols-2">
                  <div className="mt-2 text-left">
                    Delivery type
                  </div>
                  <div className="mt-2 text-left">
                    Paid type
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2">
                  <div className="text-left">
                    <CheckboxFive name='Fast' />
                    <CheckboxFive name='Normal' />
                  </div>
                  <div className="text-right">
                    <CheckboxFive name='Sender' />
                    <CheckboxFive name='Delivery' />
                  </div>
                </div>
              </div>

              <div className='mt-2'>
                <label className="mb-3 block font-medium text-black dark:text-white">Note</label>
                <textarea
                  rows={6}
                  placeholder="Input note"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

            {/*  submit button here*/}
            </div>
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


export default FormElements
