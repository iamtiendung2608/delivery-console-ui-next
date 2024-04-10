'use server'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'

export async function actionEditBlog(blogId: string, formData: FormData) {
  try {
    const data = Object.fromEntries(formData)
    delete data.title
    const payload = JSON.stringify(data)

    await fetchWithRetry(`${API_ENDPOINT}/admin/blog/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    return { message: `Edit blog ${blogId} success`, error: false }
  } catch (error) {
    console.error('actionEditBlog error:::', (error as Error)?.message)
    return { message: `Edit blog ${blogId} failure!`, error: true }
  }
}
