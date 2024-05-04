import { GetStaticPropsContext } from 'next'
import ConfirmSignupComponent from '@/components/Auth/ConfirmSignupComponent'


const ConfirmSignupPage = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;

  return (
    <>
      <ConfirmSignupComponent id={Number(id)} />
    </>
  )
}


export default ConfirmSignupPage;
