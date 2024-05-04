import FormAddPostOffices from '@/components/PostOffices/FormAddPostOffices'
import { actionGetPostOfficesDetail } from '@/app/(user)/post-offices/[id]/actions'
import { GetStaticPropsContext } from 'next'


const AddPostOffices = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;
  const response = await actionGetPostOfficesDetail(id)

  return (
    <>
      <FormAddPostOffices formAddPostOffices={response} editAction={false}/>
    </>
  )
}

export default AddPostOffices;