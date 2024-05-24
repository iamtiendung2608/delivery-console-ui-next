'use server'
import { cookies } from 'next/headers'
import { API_ENDPOINT } from '@/utils/contstants'
import { OrganizationResponse, UserResponse } from '@/components/Setting/SettingsComponent'



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

  const response = await fetch(`${API_ENDPOINT}/organizations/${id}`, requestOptions);
  return await response.json();
}


export async function actionEditUser(form: UserResponse): Promise<number> {
  const accessToken = await cookies().get("access_token");
  const payload = JSON.stringify(form);
  const requestOptions: RequestInit = {
    method: 'PUT', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
    body: payload, // Move the body outside of the headers object
  };

  const response = await fetch(`${API_ENDPOINT}/auth/me/${form.id}`, requestOptions);
  return response.status;
}


export async function actionEditOrganization(form: OrganizationResponse): Promise<number> {
  const accessToken = await cookies().get("access_token");
  const payload = JSON.stringify(form);
  const requestOptions: RequestInit = {
    method: 'PUT', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
    body: payload
  };

  const response = await fetch(`${API_ENDPOINT}/organizations/${form.id}`, requestOptions);
  return response.status
}




