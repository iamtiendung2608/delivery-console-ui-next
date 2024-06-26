'use server';

import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'

export async function actionGetAssignedOrder(keyword: string, pageNumber: number): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/order/search-assigned?page=${pageNumber}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  return await response.json();
}


export async function actionCreateTransaction(id: number, officesId: number | undefined, note: string, status: string | undefined): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'POST', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: status,
      note: note,
      orderId: id,
      postOfficeId: officesId,
    })
  };
  console.log(requestOptions);
  const response = await fetch(`${API_ENDPOINT}/transaction`, requestOptions);
  return await response.json();
}


