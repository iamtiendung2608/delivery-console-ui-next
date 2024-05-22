'use server'
import { cookies } from 'next/headers'
import { API_ENDPOINT } from '@/utils/contstants'
import { LocationResponse, OrganizationResponse, UserResponse } from '@/components/Setting/SettingsComponent'



export async function actionGetUser(): Promise<UserResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/auth/me`, requestOptions);
  return await response.json();
}


export async function actionGetOrganizationDetail(id: number): Promise<OrganizationResponse> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/organization/${id}`, requestOptions);
  return await response.json();
}


export async function actionEditUser(): Promise<number> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'PUT', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  };

  const response = await fetch(`${API_ENDPOINT}/organization/}`, requestOptions);
  return await response.status;
}


