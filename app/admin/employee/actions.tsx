'use server'

import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { cookies } from 'next/headers'


export async function actionGetAdminEmployee(keyword: string, currentPage: number) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/employee?keyword=${keyword}&page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  return await response.json();
}


export async function actionChangeEmployeeStatus(id: number, active: boolean) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'PATCH', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      active: active
    })
  };

  const response = await fetch(`${API_ENDPOINT}/admin/employee/${id}`, requestOptions);
  return await response.status;
}

