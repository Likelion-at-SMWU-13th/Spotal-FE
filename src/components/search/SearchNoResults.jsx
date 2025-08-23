import React from 'react'
import Close from '@/assets/Close.svg'
import NoResult from '@/assets/NoResult.svg'

const SearchNoResults = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-[rgba(173,173,173,0.5)] z-[1000] flex items-center justify-center'>
      <div className='bg-white rounded-[20px] shadow-lg p-6 w-[85%] max-w-[400px] flex flex-col items-center'>
        <div className='self-end mb-[1vh]'>
          <img src={Close} onClick={onClose} className='cursor-pointer w-[6vw] h-[6vh] mr-[2vw]' />
        </div>

        <h1 className='text-center text-xl font-bold mb-[3vh]'>검색 결과가 없어요</h1>

        <img src={NoResult} alt='character' />

        <button className='w-[90%] h-[7vh] py-2.5 mt-[3vh] mb-[1vh] rounded-[10px] border border-primary-200 bg-white text-grey-700 text-m cursor-pointer select-none transition-colors duration-300 hover:bg-primary hover:text-white'>
          커뮤니티에 물어보기
        </button>
        <button className='w-[90%] h-[7vh] py-2.5 rounded-[10px] border border-primary-200 bg-white text-grey-700 text-m cursor-pointer select-none transition-colors duration-300 hover:bg-primary hover:text-white'>
          가게 제보하기
        </button>
      </div>
    </div>
  )
}

export default SearchNoResults
