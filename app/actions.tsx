'use server'


import { cookies } from 'next/headers'

export default async function getRole() {
  const response = await cookies().get("role");
  return response?.value
}