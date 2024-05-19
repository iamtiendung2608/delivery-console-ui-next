'use server';

import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import { cookies } from 'next/headers'
import { TransferObjectRequest, TransferObjectResponse } from '@/components/Order/FormAddOrder'
import { CreateOrderRequest, CreateOrderResponse } from '@/components/TransferObject/CommodityInformationComponent'


export async function actionAddTransferObject(
  formData: TransferObjectRequest
): Promise<TransferObjectResponse> {

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
  const response = await fetchWithRetry(`${API_ENDPOINT}/transfer-object`, requestOptions);
  return response.json();
}


export async function actionAddOrder(
  formData: CreateOrderRequest
): Promise<CreateOrderResponse> {

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
  console.log(requestOptions);
  const response = await fetchWithRetry(`${API_ENDPOINT}/order`, requestOptions);
  console.log('response: ' + response)
  return response.json();
}