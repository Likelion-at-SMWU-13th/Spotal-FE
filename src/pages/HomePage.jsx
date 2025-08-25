import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import Search from '../assets/Search.svg'
import Arrow from '../assets/ArrowUp.svg'
import Footer from '@/components/shared/Footer'
import SearchResults from '@/components/search/SearchResults'
import usePlaceSearch from '@/hooks/usePlaceSearch'
import SearchNoResults from '@/components/search/SearchNoResults'
import Loading from '@/components/shared/Loading'
import { toast } from 'sonner'

const HomePage = () => {
  const [keyword, setKeyword] = useState('')
  const [isToggle, setIsToggle] = useState(false)
  const [isNoResult, setNoResult] = useState(false)
  const navigate = useNavigate()
  const { fetchMarker, status } = usePlaceSearch()

  const goToMap = async (keyword) => {
    const { marker, status } = await fetchMarker(keyword)

    if (!keyword.trim()) {
      toast('🟡 검색어를 입력해주세요!')
      return
    }
    if (status === 'success') {
      navigate('/map', { state: { markers: marker } })
    }
    if (status === 'noResults') {
      setNoResult(true)
      setKeyword('')
    }
  }

  const goToMemory = () => {
    navigate('/memory')
  }

  const handleToggle = () => setIsToggle((prev) => !prev)

  const handleCloseInfo = () => {
    setNoResult(false)
  }

  return (
    <div className='bg-white flex flex-col items-center w-full min-h-screen max-w-[768px] mx-auto px-4'>
      {status === 'loading' && <Loading />}
      <img className='mt-[18.36vh]' src={Logo} alt='로고' />

      {isNoResult && <SearchNoResults onClose={handleCloseInfo} />}

      <div className='flex justify-between items-center border-2 border-primary rounded-[20px] p-2 mt-[3vh] h-[6.5vh] w-full max-w-[500px]'>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='가게 이름, 위치를 검색해보세요!'
          className='ml-3 text-base md:text-lg w-full outline-0'
          aria-label='검색창'
        />
        <button
          onClick={() => goToMap(keyword)}
          className='flex justify-center items-center min-w-[40px] h-[4vh] rounded-[12px] bg-primary px-2'
        >
          <img src={Search} alt='검색 버튼' />
        </button>
      </div>

      <SearchResults keyword={keyword} goToMap={goToMap} />

      <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-[120px] flex flex-col items-center justify-center w-full max-w-[768px]'>
        <img src={Arrow} onClick={handleToggle} />
        <p className='mt-4 text-base md:text-lg text-grey-200'>화살표를 눌러 기억을 꺼내보세요</p>
      </div>

      <div
        onClick={goToMemory}
        className={`
          fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-[120px] flex flex-col items-center justify-center z-[30]
          h-[15vh] w-[85%] mx-auto max-w-[500px] bg-[#FEF1DA] border border-primary rounded-[7px]
          transition-transform duration-500 ease-out
          ${isToggle ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}
        `}
      >
        <h1 className='text-lg md:text-2xl font-[Bold] text-grey-700'>감정으로 기억 꺼내기</h1>
        <p className='mt-2 text-base md:text-lg text-[#828282]'>분위기, 느낌으로 기억하시나요?</p>
      </div>
      <Footer selectedMenu='home' />
    </div>
  )
}

export default HomePage
