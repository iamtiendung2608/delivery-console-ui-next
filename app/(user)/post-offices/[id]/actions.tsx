'use server'

import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { fetchWithRetry } from '@/utils/api'
import { cookies } from 'next/headers'


export async function actionGetPostOfficesDetail(id: string) {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/post-offices/${id}`, requestOptions);
  return await response.json();
}