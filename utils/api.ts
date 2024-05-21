'use server';
import { cookies } from 'next/headers'
import { deleteCookie } from 'cookies-next'

export async function fetchWithRetry(url: string, options?: RequestInit, maxRetries: number = 0, timeout: number = 5000) {
  let retries = 0

  const fetchWithTimeout = (url: string, options?: RequestInit) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
    ])
  }

  const doFetch = async (): Promise<any> => {
    return fetchWithTimeout(url, options)
      .then((response: any) => {
        if (!response?.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response
      })
      .catch((error: any) => {
        retries++
        if (retries <= maxRetries) {
          console.warn(`Retrying (${retries}/${maxRetries})...`)
          return doFetch()
        } else {
          throw error
        }
      })
  }

  return doFetch()
}


export const setCookiesHeader = (value: any) => {
  cookies().set('access_token', value)
}

export const setRoleHeader = (value: any) => {
  cookies().set('role', value)
}

export const clearCookies = () => {
  deleteCookie('access_token', { cookies });
  deleteCookie('role', { cookies });
}