'use server'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'

export async function actionAddBlog(formData: FormData) {
  try {
    const data = Object.fromEntries(formData)
    delete data.title
    const payload = JSON.stringify(data)

    await fetchWithRetry(`${API_ENDPOINT}/admin/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    return { message: 'Add Blog successful.', error: false }
  } catch (error) {
    console.error('Action AddBlog error:::', error)
    return { message: 'Add Blog failure!', error: true }
  }
}
