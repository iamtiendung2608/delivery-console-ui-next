'use client'
import Loader from '@/components/common/Loader'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import './data-tables-css.css'
import './globals.css'
import './satoshi.css'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'
import getRole from '@/app/actions'
import { useRouter } from 'next/navigation'

type Props = PropsWithChildren<{
  modal: React.ReactNode
}>

export default function RootLayout({ children, modal }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [role, setRole] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    ;(async () => {
      const response = await getRole();
      if (response === undefined) {
        router.push('/signin');
      }
      setRole(await response);
    })()
  }, [])


  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
          {loading ? (
            <Loader />
          ) : (
            <div className='flex h-screen overflow-hidden'>
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar role={role} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                {/* <!-- ===== Header Start ===== --> */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{children}</div>
                </main>
                {modal}
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
