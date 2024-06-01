import ECommerce from '@/components/Dashboard/E-commerce'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import getRole from '@/app/actions'
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'TailAdmin | Next.js E-commerce Dashboard Template',
  description: 'This is Home Blog page for TailAdmin Next.js'
  // other metadata
}

export default async function Home() {

  const role = await getRole();
  return (
    <div>
      <ECommerce role={role} />
    </div>
  );
}
