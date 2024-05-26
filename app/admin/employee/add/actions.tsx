'use server';


import { cookies } from 'next/headers'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'

export interface FormAddEmployee{
  id: number
  name: string,
  phone: string,
  address: string,
  email: string,
  locationTagId: number
}

export async function actionAddEmployee(formData: FormAddEmployee){
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
  const response = await fetchWithRetry(`${API_ENDPOINT}/admin/employee`, requestOptions);
  return await response.status;
}

export async function actionEditEmployee(formData: FormAddEmployee){
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
      email: formData.email,
    })
  };
  console.log(requestOptions);
  const response = await fetchWithRetry(`${API_ENDPOINT}/admin/employee/${formData.id}`, requestOptions);
  return await response.status;
}