import Link from 'next/link'
interface BreadcrumbProps {
  pageName: string
  fullPageName: string
}
const Breadcrumb = ({ pageName, fullPageName }: BreadcrumbProps) => {
  return (
    <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <h2 className='text-title-md2 font-semibold text-black dark:text-white'>{pageName}</h2>

      <nav>
        <ol className='flex items-center gap-2'>
          <li>
            <Link className='font-medium text-primary' href='/'>
              {fullPageName}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
