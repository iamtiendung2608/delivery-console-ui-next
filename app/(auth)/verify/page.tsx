import { GetStaticPropsContext } from 'next'
import OtpInput  from '@/components/Auth/VerifyComponent'
import VerifyComponent from '@/components/Auth/VerifyComponent'



const VerifyOTP = (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;

  return (
    <VerifyComponent

    />
  );
}


export default VerifyOTP
