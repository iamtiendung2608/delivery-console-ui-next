/* eslint-disable @next/next/no-img-element */
'use client'
import { XIcon } from '@/app/_components/icons/x'
import { Link } from '@/app/_components/link'
import { marked } from 'marked'
import { useCallback, useState, type ChangeEvent, type FC, type MouseEvent } from 'react'
import { toast } from 'react-hot-toast'

type FormAddBlogPropsType = {
  blogDetail: any
  actionEditBlog: (formData: FormData) => Promise<{
    message: string
    error: boolean
  }>
}

const ThumpNail = ({
  thumpnail,
  handleDeleteThumpnail
}: {
  thumpnail: string
  handleDeleteThumpnail: VoidFunction
}) => {
  const [isDeleteIcon, setIsDeleteIcon] = useState(false)

  const onShowDeleteIcon = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDeleteIcon(true)
  }, [])

  const onHideDeleteIcon = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDeleteIcon(false)
  }, [])

  const onDeleteThumpNail = useCallback(
    (_event: MouseEvent<SVGSVGElement>) => {
      handleDeleteThumpnail()
    },
    [handleDeleteThumpnail]
  )

  return (
    <div className='w-fit flex relative' onMouseOver={onShowDeleteIcon} onMouseOut={onHideDeleteIcon}>
      <img className='w-[300px] h-[300px]' src={thumpnail} alt='blog-thumbnail' width={800} height={800} />
      {isDeleteIcon ? (
        <XIcon className='text-danger cursor-pointer right-0 absolute' onClick={onDeleteThumpNail} />
      ) : null}
    </div>
  )
}

const FormEditBlog: FC<FormAddBlogPropsType> = ({ blogDetail, actionEditBlog }) => {
  const [thumpnail, setThumpnail] = useState<string>('')
  const [content, setContent] = useState<string>(blogDetail?.content ?? '')

  const handleEditBlog = async (formData: FormData) => {
    const result = await actionEditBlog(formData)
    if (result?.error) {
      toast.error(result?.message ?? 'Add blog failure!')
    } else {
      toast.success(result?.message ?? 'Add blog successful.')
    }
  }

  const onChangeThumbnail = () => {
    setThumpnail(
      'https://marketplace.canva.com/EAFfJSYZZT8/1/0/1600w/canva-marketing-blog-youtube-thumbnail-4fAKzNJmLMs.jpg'
    )
  }

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  return (
    <form action={handleEditBlog}>
      <div className='mb-5.5'>
        <label className='mb-3 block text-sm font-medium text-black dark:text-white' htmlFor='Username'>
          Title
        </label>
        <input
          className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
          type='text'
          name='title'
          id='title'
          placeholder='Please type title'
          defaultValue={blogDetail?.variants?.[0]?.title ?? ''}
        />
      </div>
      <div className='mb-5.5'>
        <label className='mb-3 block text-sm font-medium text-black dark:text-white' htmlFor='Username'>
          Slugs
        </label>
        <input
          className='w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
          type='text'
          name='url'
          id='url'
          placeholder={blogDetail?.url ?? ''}
          defaultValue={blogDetail?.url ?? ''}
        />
      </div>

      <div>
        <label className='mb-3 block text-black dark:text-white'>Category</label>
        <div className='relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input'>
          <div className='flex flex-wrap items-center'>
            <span className='m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30'>
              Design
              <span className='cursor-pointer pl-2 hover:text-danger'>
                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </span>
            </span>
            <span className='m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30'>
              Development
              <span className='cursor-pointer pl-2 hover:text-danger'>
                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </span>
            </span>
          </div>
          <select name='' id='' className='absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0'>
            <option value=''>Option</option>
            <option value=''>Option</option>
          </select>
          <span className='absolute top-1/2 right-4 z-10 -translate-y-1/2'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g opacity='0.8'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                  fill='#637381'
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className='mb-5.5'>
        <label className='mb-3 block text-sm font-medium text-black dark:text-white' htmlFor='Username'>
          Description
        </label>
        <div className='relative'>
          <span className='absolute left-4.5 top-4'>
            <svg
              className='fill-current'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g opacity='0.8' clipPath='url(#clip0_88_10224)'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z'
                  fill=''
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z'
                  fill=''
                />
              </g>
              <defs>
                <clipPath id='clip0_88_10224'>
                  <rect width='20' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </span>
          <textarea
            className='w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
            name='description'
            id='description'
            rows={6}
            placeholder='Write description'
            defaultValue={blogDetail?.description ?? ''}
            onChange={onChangeContent}
          />
          <div className='mt-2'>
            <label className='block text-sm text-black mb-2'>Preview markdown</label>
            <div
              className='markdown-preview p-2 border border-gray-300 rounded-md min-h-[10rem]'
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          </div>
        </div>
      </div>

      <label className='mb-3 block text-sm font-medium text-black dark:text-white' htmlFor='Username'>
        Thumbnail
      </label>
      {thumpnail ? (
        <ThumpNail thumpnail={thumpnail} handleDeleteThumpnail={() => setThumpnail('')} />
      ) : (
        <div
          id='FileUpload'
          className='relative mb-5.5 block w-[300px] cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
        >
          <input
            type='file'
            accept='image/*'
            className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
            onChange={onChangeThumbnail}
          />
          <div className='flex flex-col items-center justify-center space-y-3'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                  fill='#3C50E0'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                  fill='#3C50E0'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                  fill='#3C50E0'
                />
              </svg>
            </span>
            <p>
              <span className='text-primary'>Click to upload</span> or drag and drop
            </p>
            <p className='mt-1.5'>SVG, PNG, JPG or GIF</p>
            <p>(max, 800 X 800px)</p>
          </div>
        </div>
      )}

      <div className='flex justify-end gap-4.5'>
        <Link href={'/blogs'} passHref replace>
          <button
            className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
            type='button'
          >
            Cancel
          </button>
        </Link>
        <button
          className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default FormEditBlog
