import React, { useState } from 'react'
import ProgressBar from '@/components/onboarding/ProgressBar.jsx'
import OnBoarding1 from '../assets/OnBoarding1.svg'
import OnBoarding2 from '../assets/OnBoarding2.svg'
import OnBoarding3 from '../assets/OnBoarding3.svg'
import FooterBtn from '@/components/onboarding/FooterBtn.jsx'
import { useNavigate } from 'react-router-dom'

const OnBoardingPage = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    { question: '골목에서 좋아하던 가게가 <br/> 사라진 걸 깨달은 적 있나요?', image: OnBoarding1 },
    {
      question:
        'Spotal은 감정 기반으로 <br/>사라진 기억의 흔적을 다시 이어주는 <br/>용산의 정서 지도에요.',
      image: OnBoarding2,
    },
    {
      question:
        '누구는 분위기만 기억하고, <br/>누구는 가게 이름을 정확히 기억해요. <br/>당신의 기억 방식은 어떤가요?',
      image: OnBoarding3,
    },
  ]

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
    <>
      <ProgressBar step={step} totalSteps={steps.length} onBack={prevStep} />
      <div className='flex flex-col min-h-screen items-center justify-items-center bg-white'>
        <p
          className='font-[SemiBold] text-grey-700 mt-[17%] text-xl text-center'
          dangerouslySetInnerHTML={{ __html: steps[step].question }}
        />
        <div className='absolute top-[39.9vh] w-[76.9vw] h-[35.54vh] left-1/2 -translate-x-1/2'>
          <div className='absolute mt-[50px] w-[60vw] h-[25vh] inset-0 -z-10 bg-primary-200 blur-[9rem] rounded-full pointer-events-none' />
          <img
            className='relative z-10 w-full h-full object-contain'
            src={steps[step].image}
            alt='온보딩 캐릭터'
          />
        </div>
      </div>
      <div className='absolute bottom-[11.14vh] flex justify-between w-full px-[6.67vw]'>
        <FooterBtn onClick={goToLogin} text={'건너뛰기'} />
        <FooterBtn onClick={nextStep} text={step < steps.length - 1 ? '다음' : '시작하기'} />
      </div>
    </>
  )
}

export default OnBoardingPage
