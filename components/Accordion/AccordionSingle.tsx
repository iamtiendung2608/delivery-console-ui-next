'use client';
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

const AccordionSingle = ({ title, children, defaultValue }: any) => {
  const [expanded, setExpanded] = useState( true );

  const toggleExpanded = () => setExpanded( (current) => !current );

  useEffect( () => {
    setExpanded(defaultValue);
  }, [defaultValue] )

  return (
    <>
      <div className='w-full my-1  cursor-pointer bg-white border border-gray-300 rounded-lg' >
        <div className='px-3 text-left items-center h-10 select-none flex justify-between flex-row ' onClick={toggleExpanded}>
          <h5 className='flex items-center text-sm'>
            {expanded ? <ChevronDown className='h-4' /> : <ChevronRight className='h-4' />} {title}
          </h5>
        </div>
        <div
          className={`pt-0 rounded-lg overflow-hidden transition-[max-height] duration-100 ease-in ${expanded ? 'border-t h-auto bg-gray-50' : 'max-h-0'}`}>
          <div className=' text-left text-sm '>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccordionSingle
