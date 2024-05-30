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
  code: string,
  locationTagId: number
}

export async function actionAddPostOffices(formData: FormAddPostOffices){
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'POST', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };
  console.log(requestOptions);
  const response = await fetchWithRetry(`${API_ENDPOINT}/admin/post-offices`, requestOptions);
  return await response.status;
}


export async function actionEditPostOffices(formData: FormAddPostOffices){
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'PUT', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      longitude: formData.longitude,
      latitude: formData.latitude,
      sponsor: formData.sponsor,
      sponsorPhone: formData.sponsorPhone
    })
  }
  const response = await fetchWithRetry(`${API_ENDPOINT}/admin/post-offices/${formData.id}`, requestOptions);
  return await response.status;
}
