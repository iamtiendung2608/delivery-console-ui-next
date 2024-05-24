'use server';


import { cookies } from 'next/headers'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'


export interface FormAddPostOffices {
  id: number
  name: string,
  phone: string,
  address: string,
  longitude: string,
  latitude: string,
  sponsor: string,
  sponsorPhone: string,
  locationTagId: number
}

export async function actionAddPostOffices(formData: FormAddPostOffices){
  const accessToken = await cookies().get("access_token");
  const payload = JSON.stringify(formData)
  const requestOptions: RequestInit = {
    method: 'POST', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: payload
  };
  const response = await fetchWithRetry(`${API_ENDPOINT}/admin/post-offices`, requestOptions);
  return await response.status;
}