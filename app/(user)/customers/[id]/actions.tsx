'use server';



import { cookies } from 'next/headers'
import { API_ENDPOINT } from '@/utils/contstants'
import { CustomerDetail } from '@/app/(user)/customers/[id]/page'

export async function actionGetCustomerDetail(id: string): Promise<CustomerDetail> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/customer/${id}`, requestOptions);
  return await response.json();
}
