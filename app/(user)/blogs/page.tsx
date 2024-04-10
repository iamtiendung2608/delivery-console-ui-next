import { Button } from '@/app/_components/button'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { fetchWithRetry } from '@/utils/api'
import { API_ENDPOINT } from '@/utils/contstants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/app/_components/paging/Pagination'
export const metadata: Metadata = {
  title: 'Blog posts',
  description: 'This is Tables page for TailAdmin Next.js'
  // other metadata
}


const BlogList = async ({searchParams}: {
  searchParams?: {
    keyword?: string;
    page?: string;
  };
}) => {
  const keyword = searchParams?.keyword || '';
  const currentPage = Number(searchParams?.page) - 1 || 0;


  const data = await fetchWithRetry(`${API_ENDPOINT}/admin/blog?tags=${keyword}`, {
    method: 'GET',
    cache: 'no-cache'
  })
  const blogList = await data?.json()

  return (
    <>
      <Breadcrumb pageName='Blogs' fullPageName='' />
      <div className='flex flex-col gap-10'>
        <div
          className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex flex-col'>
            <div className='grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6'>
              <div className='p-2.5 xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Thumbnail</h5>
              </div>
              <div className='p-2.5 xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Title</h5>
              </div>
              <div className='p-2.5 text-center xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Tags</h5>
              </div>
              <div className='p-2.5 text-center xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Slug</h5>
              </div>
              <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Related Blog</h5>
              </div>
              <div className='hidden p-2.5 text-center sm:block xl:p-5'>
                <h5 className='text-sm font-medium uppercase xsm:text-base'>Actions</h5>
              </div>
            </div>

            {blogList &&
              (blogList?.data || []).map((blog: any, index: number) => (
                <div
                  className={`grid grid-cols-6 sm:grid-cols-6 ${
                    index === blogList.data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={index}
                >
                  <div className='gap-2s flex items-center'>
                    <div className='h-12.5 w-15 rounded-md'>
                      <Image src='/images/product/product-01.png' width={60} height={50} alt='Product' />
                    </div>
                  </div>

                  <div className='flex items-center gap-2 p-2.5 xl:p-5'>
                    <p className='hidden text-black dark:text-white sm:block'>{blog?.variants[0]?.title}</p>
                  </div>

                  <div className='flex items-center gap-2 justify-center p-2.5 xl:p-5'>
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-success bg-success`}
                    >
                      {blog.tags}
                    </p>
                  </div>

                  <div className='flex items-center gap-2 justify-center p-2.5 xl:p-5'>
                    <p className='text-meta-3'>{blog.url}</p>
                  </div>

                  <div className='hidden items-center gap-2 justify-center p-2.5 sm:flex xl:p-5'>
                    {(blog?.relatedPosts || []).map((relatedPost: any, index: number) => {
                      return (
                        <p key={index} className='text-black dark:text-white'>
                          {relatedPost?.id}
                        </p>
                      )
                    })}
                  </div>

                  <div className='hidden items-center gap-2 justify-center p-2.5 sm:flex xl:p-5'>
                    <div className='text-meta-5 flex'>
                      <Link className='mr-1 inline-block' href='/blogs/1'>
                        <button
                          className='flex w-full justify-center rounded bg-primary px-2 py-1 font-medium text-gray'>
                          Edit
                        </button>
                      </Link>
                      <button className='flex w-full justify-center rounded bg-danger px-2 py-1 font-medium text-gray'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-3 text-left">
          <Link href={'/blogs/add'} passHref>
            <Button>Add Blog</Button>
          </Link>
        </div>
        <div className="mt-3 text-right">
          <Pagination totalPages={blogList?.total} />
        </div>
      </div>
    </>
  )
}

export default BlogList
