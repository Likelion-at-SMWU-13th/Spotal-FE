import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'

const InfoContainer = ({ placeName, status, address, summary, tags = [] }) => {
  const navigate = useNavigate()

  const goToRecommended = () => {
    navigate('/recommended', {
      state: { placeData: { placeName, status, address, summary, tags }, years: true },
    })
  }

  return (
    <div className='absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[85%] max-w-[500px] bg-white rounded-[20px] shadow-lg p-6 z-[50]'>
      <button className='block bg-[#ADADAD] w-[134px] h-[5px] rounded-[10px] mx-auto mb-6'></button>

      <div className='flex justify-between items-center mb-2 bg-primary-300 pt-3 pb-3 pl-5 pr-5 rounded-[10px]'>
        <h2 className='m-0 font-bold text-xl max-w-[44vw]'>{placeName}</h2>
        <span
          className={`text-sm px-3 py-1 rounded-full border font-semibold select-none ${
            status === '폐업함'
              ? 'bg-[#FDF2F8] text-[#BE195D] border-[#BE195D]'
              : status === '이전함'
                ? 'bg-[#EFFDF4] text-[#17A34A] border-[#17A34A]'
                : 'bg-[#DBE9FE] text-[#2463EB] border-[#2463EB]'
          }`}
        >
          {status}
        </span>
      </div>

      <div className='bg-primary-300 pt-5 pb-3 pl-5 pr-5 rounded-[10px] mb-2'>
        <p className='text-m text-black mb-2 whitespace-pre-wrap'>
          <strong className='mr-1'>주소:</strong> {address}
        </p>

        <p className='text-m leading-relaxed text-black mb-2'>
          <strong className='mr-1'>요약:</strong> {summary}
        </p>

        <div className='flex gap-1 flex-wrap mb-2'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='text-xs text-gray-600 border border-[#ADADAD] px-2 py-1 rounded-[50px] select-none bg-[#FFFEFC]'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Button onClick={goToRecommended} type={'submit'} label={'유사 가게 추천 받기'}></Button>
    </div>
  )
}

export default InfoContainer
