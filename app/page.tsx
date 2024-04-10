import ECommerce from '@/components/Dashboard/E-commerce'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: 'TailAdmin | Next.js E-commerce Dashboard Template',
  description: 'This is Home Blog page for TailAdmin Next.js'
  // other metadata
}

export default function Home() {

  return (
    <div>
      <ECommerce />
    </div>
  )
}
