'use client';

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import MapComponent from '@/components/Map/map'


export interface PostOfficeDetail {
  id: number
  name: string,
  phone: string,
  address: string,
  longitude: string,
  latitude: string,
  sponsor: string,
  sponsorPhone: string,
  locationTag: {
    id: number,
    province: string,
    district: string,
    ward: string
  }
}

const getInitialValues = (formData?: PostOfficeDetail | null): PostOfficeDetail => {
  return formData ?? {
    id: 0,
    name: '',
    phone: '',
    address: '',
    longitude: '',
    latitude: '',
    sponsor: '',
    sponsorPhone: '',
    locationTag: {
      id: 0,
      province: '',
      district: '',
      ward: ''
    }
  };
};

const PostOfficesDetail: FC<{ formAddPostOffices: PostOfficeDetail | null, editAction: boolean}> = ({ formAddPostOffices, editAction }) => {
  const router = useRouter();
  const response = getInitialValues(formAddPostOffices);
  const position: number[] = [Number(response.latitude), Number(response.longitude)];

  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Post Offices Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Where you can send/receive order</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={response.name}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={response.phone}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Sponsor
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={response.sponsor}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={response.address}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <div className="text-lg leading-8 text-gray-600">{formatLocation(response?.locationTag)}</div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <MapComponent position={position} name={response.name} zoom={20} phone={response.phone} />
    </>
  )
}


function formatLocation(locationTag){
  return `${locationTag?.province}, ${locationTag?.district}, ${locationTag?.ward}`
}
export default PostOfficesDetail;
