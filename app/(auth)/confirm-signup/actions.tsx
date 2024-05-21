'use server';


import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import { ConfirmSignupProps } from '@/components/Auth/ConfirmSignupComponent'



export async function actionConfirmSignup(body : ConfirmSignupProps): Promise<void> {
  const payload = JSON.stringify(body)
  const response = await fetchWithRetry(`${API_ENDPOINT}/auth/confirm-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
  console.log(payload)
}
