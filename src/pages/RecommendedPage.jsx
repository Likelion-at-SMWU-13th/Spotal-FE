import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RecommendedPlaces from '@/components/recommend/RecommendedPlaces'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Dropdown from '@/components/community/Dropdown'

const RecommendedPage = () => {
  const location = useLocation()
  const { placeData, years } = location.state || {}

  useEffect(() => {
    document.body.classList.add('scrollbar-hide')
    return () => document.body.classList.remove('scrollbar-hide')
  }, [])

  {
    /*넘어온 값을 바탕으로 로직 처리*/
  }

  return (
    <div className='mx-auto overflow-y-auto max-h-[100vh] scrollbar-hide bg-white w-full max-w-[768px]'>
      <Header label={'유사 가게 추천 결과'}></Header>
      <div className='mt-[80px] items-center w-[80%] mx-auto flex flex-col gap-4 mb-[100px]'>
        <div className='flex justify-end'>{years && <Dropdown label={'년도'} />}</div>
        {/*로직 처리 후, 추천 장소 컴포넌트 차례대로 추가*/}
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default RecommendedPage
