'use server';

import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { SearchType } from '@/components/Location/LocationComponent'
import { FormAddCustomerRequest } from '@/components/Customers/FormAddCustomer'

export async function actionGetLocationTag(keyword: string, type: SearchType, locationId: string) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/location?keyword=${keyword}&type=${type}&locationId=${locationId}`, requestOptions);
  return await response.json();
}


export async function actionGetLocationTagDetail(locationId: string) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/location/${locationId}`, requestOptions);
  return await response.json();
}


export async function actionAddCustomer(formAddCustomer: FormAddCustomerRequest) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'POST', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formAddCustomer)
  };

  const response = await fetch(`${API_ENDPOINT}/customer`, requestOptions);
  return response.status
}






