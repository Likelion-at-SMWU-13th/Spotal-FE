import React, { useState, useEffect } from 'react'
import Return from '@/assets/return.svg'
import Highlight1 from '@/assets/Highlight1.svg'
import Highlight2 from '@/assets/Highlight2.svg'
import Memory1 from '@/assets/Memory1.svg'
import Memory2 from '@/assets/Memory2.svg'

const StepSelector = ({ step, selected, onSelect, onNext, onPrev }) => {
  const steps = [
    {
      title: `그 감정을 느꼈던 동네는\n어디였나요?`,
      subtitle: '',
      options: [
        { name: '이태원', num: 1 },
        { name: '한남동', num: 2 },
        { name: '후암동', num: 3 },
        { name: '효창동', num: 4 },
        { name: '용문동', num: 5 },
        { name: '청파동', num: 6 },
        { name: '해방촌', num: 7 },
      ],
      src: Memory2,
      button: '다음',
      highlight: Highlight2,
      highlightClass: 'absolute top-20 left-10 w-1/2 z-0',
    },
    {
      title: '그 때 어떤 감정을 느꼈나요?',
      subtitle: '가게에서 느꼈던 감정을 선택해주세요 (최대 3개)',
      options: [
        { name: '정겨움', num: 1 },
        { name: '편안함', num: 2 },
        { name: '조용함', num: 3 },
        { name: '활기참', num: 4 },
        { name: '소박함', num: 5 },
        { name: '세심함', num: 6 },
      ],
      src: Memory1,
      button: '결과 보기',
      highlight: Highlight1,
      highlightClass: 'absolute top-20 w-1/3 text-start z-0',
    },
  ]

  const currentStep = steps[step]

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

        <div className='grid justify-items-start ml-5 mb-12 z-10'>
          <h2 className='whitespace-pre-line text-xl md:text-2xl lg:text-3xl mt-2 mb-1 text-gray-800 text-start z-10 font-[SemiBold]'>
            {currentStep.title}
          </h2>
          {currentStep.subtitle && (
            <p className='text-sm md:text-base text-gray-500 mb-2 text-center z-10'>
              {currentStep.subtitle}
            </p>
          )}
        </div>

        <div className='grid grid-cols-3 gap-3 overflow-y-auto w-[80%] max-w-[400px] ml-3 z-10'>
          {currentStep.options.map((option) => {
            const isSelected = selected.includes(option.num)
            return (
              <button
                key={option.name}
                className={`cursor-pointer px-4 py-2 text-base max-w-[100px] md:text-lg rounded-full border transition-colors duration-200 ${
                  isSelected
                    ? 'bg-[#FFF8EC] border-[#FFBA42] text-[#FFBA42]'
                    : 'bg-white border-[#ADADAD] text-[#828282]'
                }`}
                onClick={() => handleClick(option.num)}
              >
                {option.name}
              </button>
            )
          })}
        </div>

        <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-[120px] flex flex-col items-center justify-center w-full max-w-[768px]'>
          <div className='absolute bottom-10 right-3 z-10'>
            <img src={currentStep.src} alt='character' />
          </div>

          <button
            onClick={onNext}
            disabled={selected.length === 0}
            className={`cursor-pointer absolute left-1/2 transform -translate-x-1/2 w-[85%] max-w-[768px] h-14 rounded-lg text-center transition-colors duration-200 z-10 ${
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
