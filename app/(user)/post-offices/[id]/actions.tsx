'use server'

import { API_ENDPOINT, DEFAULT_PAGE_SIZE } from '@/utils/contstants'
import { fetchWithRetry } from '@/utils/api'


export async function actionGetPostOffices(id: string, accessToken: string) {
  const requestOptions: RequestInit = {
    method: 'GET', // Adjust the HTTP method as needed
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTYsInJvbGUiOlsidXNlciJdLCJlbWFpbCI6InB0ZHVuZzI2MDhAZ21haWwuY29tIiwic3RhdHVzIjoiQUNUSVZFIiwiYXV0aGVudGljYXRpb25PYmplY3QiOiJVc2VyIiwiaWF0IjoxNzEyNTg2MzA1LCJleHAiOjE3MTM0NTAzMDV9.BxHrYfgpp9pILqoqbOPuxYlAUKYzE6sDrUD_QPca3pLPhYWK1jMVegLJ7sM2E0G1V6pTNFbFnKjPimdBfHNIeA',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_ENDPOINT}/post-offices/${id}`, requestOptions);
  return await response.json();
}