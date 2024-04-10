'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'


export async function actionGetSubscription(currentPage: number) {
  return await fetchWithRetry(`${API_ENDPOINT}/admin/subscription?page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`, {
    method: 'GET',
    next: { revalidate: 0 }
  })
}