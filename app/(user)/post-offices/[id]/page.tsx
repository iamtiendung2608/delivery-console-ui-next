import FormAddPostOffices from '@/components/PostOffices/PostOfficeDetail'
import { actionGetPostOfficesDetail } from '@/app/(user)/post-offices/[id]/actions'
import { GetStaticPropsContext } from 'next'
import PostOfficesDetail from '@/components/PostOffices/PostOfficeDetail'


const AddPostOffices = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;
  const response = await actionGetPostOfficesDetail(id)

  return (
    <>
      <PostOfficesDetail formAddPostOffices={response} editAction={false}/>
    </>
  )
}

export default AddPostOffices;