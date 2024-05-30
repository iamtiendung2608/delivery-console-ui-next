'use server';


import { cookies } from 'next/headers'
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { TransactionStatus } from '@/components/Employee/PopupDataComponent'

export async function actionGetOrdersEmployee(keyword: string, pageNumber: number): Promise<any> {
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



export async function actionUpdateTransaction(id: number, status: TransactionStatus, postOfficeId: number, note: string): Promise<any> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'status': status,
      'note': note,
      'postOfficeId': postOfficeId,
      'orderId': id
    })
  };

  const response = await fetch(`${API_ENDPOINT}/transaction`, requestOptions);
  return await response.json();
}
