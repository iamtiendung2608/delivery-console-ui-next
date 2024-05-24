'use server'

import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { cookies } from 'next/headers'


export async function actionGetAdminPostOffices(keyword: string, currentPage: number) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`
    },
  };

  const response = await fetch(`${API_ENDPOINT}/admin/post-offices?keyword=${keyword}&page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`, requestOptions);
  return await response.json();
}

