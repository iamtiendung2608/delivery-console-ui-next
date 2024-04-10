'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT } from "@/utils/contstants";


export async function actionPatchPaymentMethod(paymentMethodId: string, enabled: boolean) {
  try {
    await fetchWithRetry(`${API_ENDPOINT}/admin/payment/method/${paymentMethodId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "enabled" : enabled
      })
    })

    return { message: `Edit payment method ${paymentMethodId} success`, error: false }
  } catch (error) {
    console.error('actionEditPaymentMethod error:::', (error as Error)?.message)
    return { message: `Edit payment method ${paymentMethodId} failure!`, error: true }
  }
}