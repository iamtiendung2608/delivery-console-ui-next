'use client'

import { SearchBox } from '@/app/_components/search/searchBox'
import { Suspense, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
      <ul className='flex flex-row md:flex-col gap-2 items-center md:items-start px-4 overflow-auto w-full md:w-60'></ul>
      <div className='flex-1 w-full md:w-0'>
        <Suspense>
          <div>
            <div className='text-gray-200 flex flex-col gap-4'>
              <header>
                <SearchBox />
              </header>
              xxx
              <footer className='flex justify-end p-2'></footer>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  )
}
