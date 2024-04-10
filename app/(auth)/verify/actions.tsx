'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT } from '@/utils/contstants';

interface VerifyFormRequest {
  id: string
  otp: string
}

export async function actionSubmitVerify(body : VerifyFormRequest) {
  const payload = JSON.stringify(body)
  return await fetchWithRetry(`${API_ENDPOINT}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
}
