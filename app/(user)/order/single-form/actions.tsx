'use server';
import { cookies } from 'next/headers'
import { API_ENDPOINT } from '@/utils/contstants'
import { ReceiveShift } from '@/components/TransferObject/ReceiverComponent'


export interface TransferObjectResponse {
  id: number;
  atOfficeFlg: boolean;
  receiveShift: ReceiveShift;
  customer: CustomerShortResponse;
  postOffice: PostOfficesShortResponse;
  actionDate: Date
}

export interface CustomerShortResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface PostOfficesShortResponse {
  id: number;
  name: string;
  phone: string;
  address: string;
}


export async function actionGetSingleTransferObject(objectId: number): Promise<TransferObjectResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/transfer-object/${objectId}`, requestOptions);
  return await response.json();
}
