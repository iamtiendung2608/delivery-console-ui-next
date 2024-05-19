'use server';


import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { TransferObjectResponse } from '@/app/(user)/order/single-form/actions'
import { Order } from '@/app/(user)/order/type'

export async function actionGetOrders(keyword: string, pageNumber: number): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/order?page=${pageNumber}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  return await response.json();
}
