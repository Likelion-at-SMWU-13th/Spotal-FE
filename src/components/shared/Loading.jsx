import React from 'react'
import Loadingsvg from '@/assets/Loading.svg'
import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-full max-w-[768px] mx-auto h-screen flex flex-col justify-center items-center bg-white absolute left-1/2 -translate-x-1/2 z-2000'>
      <h1 className='font-bold text-grey-700 text-xl mb-2'>잠시만 기다려주세요</h1>
      <h1 className='font-bold text-grey-700 text-xl mb-15'>로딩 중입니다!</h1>
      <BeatLoader color='#ffba42' />
      <div className='relative flex justify-center items-center mt-[15vh]'>
        {/* 블러 배경 */}
        <div className='absolute w-[100%] h-[100%] bg-primary-200 blur-[9rem] rounded-full pointer-events-none -z-10 animate-pulse bg-gradient-to-b from-primary-200 to-primary' />
        {/* 캐릭터 이미지 */}
        <img
          className='relative z-10 w-full h-full object-contain'
          alt='로딩 캐릭터'
          src={Loadingsvg}
        />
      </div>
    </div>
  )
}

export default Loading
