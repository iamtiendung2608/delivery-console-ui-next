'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('keyword', term);
    } else {
      params.delete('keyword');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type='text'
      placeholder={placeholder}
      className='w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125'
      onChange={(e) => handleSearch(e.target.value)}
      // defaultValue={searchParams.get('keyword')?.toString()}
    />
  )
}