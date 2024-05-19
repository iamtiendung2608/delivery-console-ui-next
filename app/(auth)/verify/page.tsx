import { GetStaticPropsContext } from 'next'
import OtpInput  from '@/components/Auth/VerifyComponent'
import VerifyComponent from '@/components/Auth/VerifyComponent'



const VerifyOTP = (context: GetStaticPropsContext) => {

  return (
    <VerifyComponent />
  );
}


export default VerifyOTP
