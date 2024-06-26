'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT } from '@/utils/contstants';
import { CurrentUser } from '@/components/Header/DropdownUser'
import { cookies } from 'next/headers'


interface SignInFormResponse {
  message: string,
  error: boolean,
  status: number,
  accessToken: string,
  roleCode: string
}

interface SignInFormRequest {
  email: string
  password: string
}

export async function actionSubmitSignin(body : SignInFormRequest): Promise<SignInFormResponse> {
  const payload = JSON.stringify(body)
  const response = await fetchWithRetry(`${API_ENDPOINT}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
  const data = await response.json();
  return { message: 'Signin successful.', error: false, status: response.status, accessToken: data.accessToken, roleCode: data.roleCode }
}



export async function actionGetCurrentUser(): Promise<CurrentUser> {
  const accessToken = await cookies().get("access_token");
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${API_ENDPOINT}/auth/me`, requestOptions);
  return await response.json();
}