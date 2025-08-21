import React from 'react'
import Close from '@/assets/Close.svg'
import NoYongan from '@/assets/NoYongsan.svg'

const SearchNoYongsan = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-[rgba(173,173,173,0.5)] z-[1000] flex items-center justify-center'>
      <div className='bg-white rounded-[20px] shadow-lg p-6 w-[85%] max-w-[400px] flex flex-col items-center'>
        <div className='self-end mb-[1vh]'>
          <img src={Close} onClick={onClose} className='cursor-pointer w-[6vw] h-[6vh] mr-[2vw]' />
        </div>

        <h1 className='text-center text-[5vw] font-bold mb-[1vh]'>조금만 기다려주세요!</h1>
        <p className='text-center text-gray-500 text-[3.5vw] whitespace-pre-line mb-[1vh]'>
          {
            'Spotal은 지금은 용산구에서만 만나볼 수 있지만, \n곧 더 많은 지역으로 확장될 예정이에요.'
          }
        </p>
        <img src={NoYongan} alt='character' />

        <button
          onClick={onClose}
          className='w-[90%] h-[7vh] py-2.5 mt-[2vh] mb-[1vh] rounded-[10px] bg-grey-100 text-grey-300 text-[3.8vw] cursor-pointer select-none transition-colors duration-300 hover:bg-primary hover:text-white'
        >
          홈 화면으로 돌아가기
        </button>
      </div>
    </div>
  )
}

export default SearchNoYongsan
