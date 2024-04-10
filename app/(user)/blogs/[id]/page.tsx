import FormEditBlog from '@/components/Blogs/FormEditBlog'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import { GetStaticPropsContext, Metadata } from 'next'
import { actionEditBlog } from './actions'
export const metadata: Metadata = {
  title: 'Settings Page | Next.js E-commerce Dashboard Template',
  description: 'This is Settings page for TailAdmin Next.js'
  // other metadata
}

const EditBlog = async (context: GetStaticPropsContext) => {
  const blogId = context?.params?.id as string
  const data = await fetchWithRetry(`${API_ENDPOINT}/admin/blog/${blogId}`, { method: 'GET', cache: 'no-cache' })
  const blogDetail = await data?.json()

  return (
    <>
      <div className='mx-auto max-w-270'>
        <Breadcrumb pageName={blogDetail?.variants?.[0]?.title ?? ''} fullPageName='Edit Blog' />

        <div className='grid grid-cols-2 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
                <h3 className='font-medium text-black dark:text-white'>Blog Information</h3>
              </div>
              <div className='p-7'>
                <FormEditBlog blogDetail={blogDetail} actionEditBlog={actionEditBlog.bind(this, blogId)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBlog
