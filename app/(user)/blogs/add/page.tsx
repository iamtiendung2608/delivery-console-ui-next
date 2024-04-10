import FormAddBlog from '@/components/Blogs/FormAddBlog'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import { actionAddBlog } from './actions'
export const metadata: Metadata = {
  title: 'Settings Page | Next.js E-commerce Dashboard Template',
  description: 'This is Settings page for TailAdmin Next.js'
  // other metadata
}

const AddBlog = async () => {
  return (
    <>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName={'Add Blog'} fullPageName='Edit Blog' />

        <div className='grid grid-cols-2 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>Blog Information</h3>
              </div>
              <div className='p-7'>
                <FormAddBlog actionAddBlog={actionAddBlog.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBlog
