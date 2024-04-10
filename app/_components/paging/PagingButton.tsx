import { usePathname, useRouter, useSearchParams } from 'next/navigation'


export default function PagingButton({ pageValue, isActive }: { pageValue: number, isActive: boolean }) {
  let className: string = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePaging = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (pageValue).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (isActive) {
    className += " bg-cyan-500 text-white";
  }

  return (
    <button onClick={handlePaging} className={className}>
      {pageValue}
    </button>
  )
}