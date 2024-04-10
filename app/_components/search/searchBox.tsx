'use client'

import { useRef } from 'react'

export function SearchBox() {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <form className='flex gap-2 border border-blue-300 rounded-sm p-2'>
      <label htmlFor='search'>x</label>
      <input ref={ref} id='search' className='w-full bg-transparent focus:outline-none' autoFocus />
    </form>
  )
}
