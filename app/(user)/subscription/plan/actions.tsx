'use server'
import { fetchWithRetry } from "@/utils/api";
import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'


export async function actionGetSubscriptionPlan(currentPage: number) {
  return await fetchWithRetry(`${API_ENDPOINT}/admin/subscription/plan?page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`, {
    method: 'GET',
    next: { revalidate: 0 }
  })
}