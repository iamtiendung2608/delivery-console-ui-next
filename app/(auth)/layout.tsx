'use client'
import './../globals.css'
import './../data-tables-css.css'
import './../satoshi.css'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/common/Loader'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
          {loading ? (
            <Loader />
          ) : (
            <div className='flex h-screen overflow-hidden'>
              {/* <!-- ===== Main Content Start ===== --> */}
              <main className='w-full flex items-center'>
                <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{children}</div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
          )}
        </div>
      </body>
    </html>
  )
}
