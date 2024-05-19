'use server';
import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'


export async function actionGetOrderDetail(id: string): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/order/${id}`, requestOptions);
  return await response.json();
}


export async function actionGetOrderTransaction(id: string): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/transaction/${id}`, requestOptions);
  return await response.json();
}
