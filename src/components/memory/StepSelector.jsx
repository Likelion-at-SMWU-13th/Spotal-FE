import React, { useState, useEffect } from 'react'
import Return from '@/assets/return.svg'
import Highlight1 from '@/assets/Highlight1.svg'
import Highlight2 from '@/assets/Highlight2.svg'
import Memory1 from '@/assets/Memory1.svg'
import Memory2 from '@/assets/Memory2.svg'

const StepSelector = ({ step, selected, onSelect, onNext, onPrev }) => {
  const [highlightSrc, setHighlightSrc] = useState(null)
  const [highlightClass, setHighlightClass] = useState('')

  const steps = [
    {
      title: `그 감정을 느꼈던 동네는\n어디였나요?`,
      subtitle: '',
      options: ['이태원', '한남동', '후암동', '효창동', '용문동', '청파동', '해방촌'],
      src: Memory2,
      button: '결과 보기',
      highlight: Highlight2,
      highlightClass: 'absolute top-20 left-10 w-1/2 z-0', // step1 위치
    },
    {
      title: '그 때 어떤 감정을 느꼈나요?',
      subtitle: '가게에서 느꼈던 감정을 선택해주세요 (최대 3개)',
      options: ['상쾌함', '편안함', '조용함', '활기참', '소박함', '세련됨'],
      src: Memory1,
      button: '다음',
      highlight: Highlight1,
      highlightClass: 'absolute top-20 w-1/3 text-start z-0', // step2 위치
    },
  ]

  const currentStep = steps[step]

  useEffect(() => {
    setHighlightSrc(currentStep.highlight)
    setHighlightClass(currentStep.highlightClass)
  }, [step])

  const handleClick = (option) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option))
    } else if (!currentStep.subtitle || (currentStep.subtitle && selected.length < 3)) {
      onSelect([...selected, option])
    }
  }

  return (
    <div className='w-full max-w-[768px] mx-auto h-screen bg-[rgba(173,173,173,0.5)] pt-5 relative'>
      <div className='w-full h-full bg-white rounded-t-[50px] p-6 shadow-lg flex flex-col relative'>
        <img
          src={Return}
          onClick={onPrev}
          className='w-3 h-4 mt-20 ml-4 mb-2 cursor-pointer z-10'
        />

        {/* Highlight 이미지 */}
        {/* <img src={highlightSrc} alt="highlight" className={highlightClass} /> */}

        <div className='grid justify-items-start ml-5 mb-12 z-10'>
          <h2 className='whitespace-pre-line text-xl md:text-2xl lg:text-3xl mt-2 mb-1 font-extrabold text-gray-800 text-start z-10 font-[ExtraBlod]'>
            {currentStep.title}
          </h2>
          {currentStep.subtitle && (
            <p className='text-sm md:text-base text-gray-500 mb-2 text-center z-10'>
              {currentStep.subtitle}
            </p>
          )}
        </div>

        {/* 옵션 버튼 */}
        <div className='grid grid-cols-3 gap-3 overflow-y-auto w-[80%] max-w-[400px] ml-3 z-10'>
          {currentStep.options.map((option) => {
            const isSelected = selected.includes(option)
            return (
              <button
                key={option}
                className={`px-4 py-2 text-base max-w-[100px] md:text-lg rounded-full border transition-colors duration-200 ${
                  isSelected
                    ? 'bg-[#FFF8EC] border-[#FFBA42] text-[#FFBA42]'
                    : 'bg-white border-[#ADADAD] text-[#828282]'
                }`}
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* 다음 버튼 */}
        <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-[120px] flex flex-col items-center justify-center w-full max-w-[768px]'>
          <div className='absolute bottom-10 right-3 z-10'>
            <img src={currentStep.src} alt='character' />
          </div>

          <button
            onClick={onNext}
            disabled={selected.length === 0}
            className={`absolute left-1/2 transform -translate-x-1/2 w-[85%] max-w-[768px] h-14 rounded-lg text-center transition-colors duration-200 z-10 ${
              selected.length === 0
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary'
            }`}
          >
            {currentStep.button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepSelector
