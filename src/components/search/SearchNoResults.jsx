import Close from '@/assets/Close.svg'
import NoResult from '@/assets/NoResult.svg'
import { useNavigate } from 'react-router-dom'

const SearchNoResults = ({ onClose }) => {
  const navigate = useNavigate()
  return (
    <div className='fixed inset-0 bg-[rgba(173,173,173,0.5)] z-[1000] flex items-center justify-center'>
      <div className='bg-white rounded-[20px] shadow-lg p-6 w-[85%] max-w-[400px] flex flex-col items-center'>
        <div className='self-end mb-[1vh]'>
          <img src={Close} onClick={onClose} className='cursor-pointer mr-[1vw]' />
        </div>
        <h1 className='text-center text-xl font-[Bold] mb-[2vh]'>
          찾으시는 장소를 발견하지 못했어요
        </h1>
        <h1 className='whitespace-pre-line text-center leading-[20px] text-gray-500 text-xs mb-[2vh]'>
          {`대신 다른 사용자들이 기록한 숨은 명소들을\n둘러보는 건 어떠세요?`}
        </h1>
        <img src={NoResult} alt='character' />
        <button
          onClick={() => navigate('/post')}
          className='w-[90%] h-[7vh] py-2.5 mt-[3vh] mb-[1vh] rounded-[10px] bg-gray-100 text-grey-300 text-m cursor-pointer select-none transition-colors duration-300 hover:bg-primary hover:text-white'
        >
          다른 장소 둘러보기
        </button>
      </div>
    </div>
  )
}

export default SearchNoResults
