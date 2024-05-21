'use client';
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/_components/button'
import { actionResendVerify, actionSubmitVerify } from '@/app/(auth)/verify/actions'
import { toast, Toaster } from 'react-hot-toast'
import OtpInput from 'react-otp-input';
import { useRouter, useSearchParams } from 'next/navigation'
import Countdown from 'react-countdown';



const VerifyComponent = () => {
  const [otp, setOtp] = useState('');
  const [allowResend, setAllowResend] = useState<boolean>(true);
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter();

  const handlerVerification = async (currentOtp: string) => {
    if (id !== null) {
      try {
        const response = await actionSubmitVerify({ id: Number(id), code: currentOtp });
        toast.success('Verification successful');
        const params = new URLSearchParams(searchParams);
        params.set('id', id);
        window.location.href=`/confirm-signup?${params.toString()}`
        router.refresh();
      } catch {
        setOtp('');
        toast.error('Verification fail!');
      }
    }
  };

  const onResendEmailCode = async () => {
    const response = await actionResendVerify(id);
    if (response === 200) {
      toast.success('Resend verification successful');
    }
    toast.error('Resend verification fail');
  }

  return (
  <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className='flex flex-wrap items-center'>
      <div className='hidden w-full xl:block xl:w-1/2'>
        <div className='py-17.5 px-26 text-center'>
          <Link className='mb-5.5 inline-block' href='/'>
            <Image className='hidden dark:block' src={'/images/logo/logo.svg'} alt='Logo' width={176} height={32} />
            <Image className='dark:hidden' src={'/images/logo/logo-dark.svg'} alt='Logo' width={176} height={32} />
          </Link>
          <p className='2xl:px-20'>Please check your email to receive OTP or ask us to resend it.</p>

          <span className='mt-15 inline-block'>
            <Image src="/images/icon/verify.svg" alt="Data Icon" width={1500} height={1500} />
          </span>
        </div>
      </div>

      <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            Typing your received OTP
          </h2>

          <div className="flex gap-2">
            {/* Map through the array and render input components */}
            <OtpInput
              value={otp}
              onChange={(otp) => {
                setOtp(otp);
                if (otp.length === 6) {
                  handlerVerification(otp);
                }
              }}
              numInputs={6}
              containerStyle="flex justify-center space-x-2"
              inputStyle={{
                width: '40px', // Adjust the width of each block
                height: '60px', // Adjust the height of each block
                borderRadius: '8px', // Rounded border
                border: '2px solid gray', // Black border
                textAlign: 'center',
                fontSize: '1.5rem', // Adjust the font size
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="flex flex-col space-y-5 mt-5">
            <div>
              <Button
                // disabled={isLoading || otp.length < 6}
                // isLoading={isLoading}
                // onClick={() => onVerifyEmail(otp)}
                type='button'
                className='flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-black border-none text-white text-sm shadow-sm  disabled:bg-slate-200 disabled:text-black'
              >
                Verify Account
              </Button>

            </div>

            <div
              className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't receive code?</p>
              {
                allowResend ? (
                  <div onClick={() => onResendEmailCode()}
                       className="flex flex-row items-center text-blue-600 cursor-pointer">Resend</div>
                ) : (
                  <div>Resend after <Countdown onStop={() => setAllowResend(true)} date={Date.now() + 10000} /></div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default VerifyComponent;
