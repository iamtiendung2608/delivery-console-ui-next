'use server'

import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { cookies } from 'next/headers'


export async function actionGetCustomers(keyword: string, currentPage: number) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/customer?page=0&size=10&deleted=false&keyword=${keyword}&page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  return await response.json();
}


export async function actionGetSingleCustomers(customerId: number) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/customer/${customerId}`, requestOptions);
  return await response.json();
}


