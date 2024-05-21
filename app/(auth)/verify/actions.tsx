'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT } from '@/utils/contstants';

export interface VerifyFormRequest {
  id: number
  code: string
}

export async function actionSubmitVerify(body: VerifyFormRequest) {
  const payload = JSON.stringify(body)
  const response = await fetchWithRetry(`${API_ENDPOINT}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  });
  return await response.status;
}


export async function actionResendVerify(id: string | null) {
  let idNumber: number | null = null;

  if (id !== null) {
    idNumber = parseInt(id, 10);
  }

  const payload = JSON.stringify({
    id: idNumber
  });

  const response = await fetchWithRetry(`${API_ENDPOINT}/auth/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
  console.log(payload);
  console.log(await response.status);
  return await response.status;
}




