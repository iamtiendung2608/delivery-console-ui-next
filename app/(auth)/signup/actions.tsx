'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT } from '@/utils/contstants';

interface SignUpFormResponse{
  message: string,
  error: boolean,
  status: number,
  data: {
    id: number
  }
}

interface SignUpFormRequest {
  email: string
  password: string
  retypePassword: string
  fullName: string
}

export async function actionSubmitSignup(body : SignUpFormRequest): Promise<SignUpFormResponse> {
  const payload = JSON.stringify(body)
  const response = await fetchWithRetry(`${API_ENDPOINT}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
  return { message: 'Add Blog successful.', error: false, status: response.status, data: await response.json() }
}
