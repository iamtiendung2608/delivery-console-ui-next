'use client';

import PagingButton from '@/app/_components/paging/PagingButton'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_PAGE_SIZE } from '@/utils/contstants'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const renderPageButtons = () => {
    let pages = [];
    const divideElement = totalPages / DEFAULT_PAGE_SIZE ;
    const displayPages = divideElement <= 1 ? 1 : divideElement + 1;

    for (let i = 1; i <= Math.min(displayPages, 3); i++) {
      pages.push(
        <PagingButton
          key={i}
          pageValue={i}
          isActive={i === currentPage}
        />
      );
    }

    if (totalPages > 3) {
      pages.push(
        <span key="ellipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
      );

      if (totalPages > 4 && currentPage < totalPages) {
        pages.push(
          <PagingButton
            key={totalPages}
            pageValue={totalPages}
            isActive={totalPages === currentPage}
          />
        );
      }
    }

    return pages;
  };

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      {/* Previous Button */}
      <button
         className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd" />
        </svg>
      </button>

      {/* Rendered Paging Buttons */}
      {renderPageButtons()}

      {/* Next Button */}
      <button
         className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd" />
        </svg>
      </button>
    </nav>
  );
}
