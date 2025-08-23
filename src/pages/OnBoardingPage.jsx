import React, { useState, useEffect } from 'react'
import ProgressBar from '@/components/onboarding/ProgressBar.jsx'
import OnBoarding1 from '../assets/OnBoarding1.svg?react'
import OnBoarding2 from '../assets/OnBoarding2.svg?react'
import OnBoarding3 from '../assets/OnBoarding3.svg?react'
import FooterBtn from '@/components/onboarding/FooterBtn.jsx'
import { useNavigate } from 'react-router-dom'

const OnBoardingPage = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    { question: '골목에서 좋아하던 가게가 <br/> 사라진 걸 깨달은 적 있나요?', Image: OnBoarding1 },
    {
      question:
        'Spotal은 감정 기반으로 <br/>사라진 기억의 흔적을 다시 이어주는 <br/>용산의 정서 지도에요.',
      Image: OnBoarding2,
    },
    {
      question:
        '누구는 분위기만 기억하고, <br/>누구는 가게 이름을 정확히 기억해요. <br/>당신의 기억 방식은 어떤가요?',
      Image: OnBoarding3,
    },
  ]

  const CurrentImage = steps[step].Image
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      navigate('/Signup')
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    } else {
      navigate(-1)
    }
  }

  const goToLogin = () => {
    navigate('/Login')
  }

  return (
    <div className='flex flex-col justify-center items-center bg-white max-w-[768px] mx-auto min-h-screen overflow-auto max-h-[100vh] scrollbar-hide'>
      <ProgressBar step={step} totalSteps={steps.length} onBack={prevStep} />
      <div className='flex flex-col min-h-screen items-center justify-items-center bg-white'>
        <p
          className='font-[SemiBold] text-grey-700 mt-[27%] text-xl text-center'
          dangerouslySetInnerHTML={{ __html: steps[step].question }}
        />
        <div className='absolute top-[39.9vh] w-[76.9vw] h-[35.54vh] left-1/2 -translate-x-1/2'>
          <div className='absolute mt-[50px] w-[70vw] md:w-[30rem] left-1/2 -translate-x-1/2 h-[25vh] inset-0 -z-10 bg-primary-200 md:blur-[7rem] blur-[5rem] rounded-full pointer-events-none animate-pulse bg-gradient-to-b from-primary-200 to-primary' />
          <CurrentImage className='relative z-10 w-full h-full' focusable={false} />
        </div>
      </div>
      <div className='absolute bottom-[9.5vh] flex max-w-[768px] md:gap-[20rem] gap-[45vw] px-[6.67vw]'>
        <FooterBtn onClick={goToLogin} text={'건너뛰기'} />
        <FooterBtn onClick={nextStep} text={step < steps.length - 1 ? '다음' : '시작하기'} />
      </div>
    </div>
  )
}

export default OnBoardingPage
