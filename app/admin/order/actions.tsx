'use server';

import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { fetchWithRetry } from '@/utils/api'

export async function actionGetAdminOrders(pageNumber: number): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/order?page=${pageNumber}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  console.log(`${API_ENDPOINT}/admin/order?page=${pageNumber}&size=${DEFAULT_PAGE_SIZE}`);
  return await response.json();
}
