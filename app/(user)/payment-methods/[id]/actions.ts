'use server'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'

export async function actionEditPaymentMethod(paymentMethodId: string, formData: FormData) {
  try {
    const data: any = Object.fromEntries(formData)
    delete data.id
    data.enabled = data.enabled === 'on' ? true : false
    const payload = JSON.stringify(data)

    await fetchWithRetry(`${API_ENDPOINT}/admin/payment/method/${paymentMethodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    return { message: `Edit payment method ${paymentMethodId} success`, error: false }
  } catch (error) {
    console.error('actionEditPaymentMethod error:::', (error as Error)?.message)
    return { message: `Edit payment method ${paymentMethodId} failure!`, error: true }
  }
}

export async function actionDeletePaymentMethod(paymentMethodId: string) {
  try {
    await fetch(`${API_ENDPOINT}/admin/payment/method/${paymentMethodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return { message: `Delete payment method ${paymentMethodId} success`, error: false }
  } catch (error) {
    console.error('actionEditPaymentMethod error:::', (error as Error)?.message)
    return { message: `Delete payment method ${paymentMethodId} failure!`, error: true }
  }
}
