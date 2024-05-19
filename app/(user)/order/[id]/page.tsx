import { GetStaticPropsContext } from 'next'
import { actionGetPostOfficesDetail } from '@/app/(user)/post-offices/[id]/actions'
import OrderDetailComponent from '@/components/Order/OrderDetailComponent'


const OrderDetail = async (context: GetStaticPropsContext) => {
  const id = context?.params?.id as string;
  return (
    <>
      <OrderDetailComponent id={id} />
    </>
  )

}

export default OrderDetail;



