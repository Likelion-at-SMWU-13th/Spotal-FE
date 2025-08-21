import DefaultImg from '@/assets/DefaultProfileImg.svg'
import ImageSlider from '@/components/community/ImageSlider'
import Footer from '@/components/shared/Footer.jsx'
import EmotionCard from '@/components/mypage/EmotionCard.jsx'
import { CardCarousel } from '@/components/mypage/CardCarousel.jsx'

const Mypage = () => {
  const urlList = ['url1', 'url2', 'url3']
  const placeData = [
    {
      placeName: '역전회관',
      status: '운영 중',
      address: '서울 마포구 염리동 173-21',
      summary: '55년이 넘는 세월 동안 연탄불이랑 어쩌고 저쩌고 듀듀',
      tags: ['세심함', '소박함', '따뜻함'],
    },
    {
      placeName: '을지면옥',
      status: '운영 중',
      address: '서울 중구 을지로3가 123-45',
      summary: '평양냉면으로 유명한 오래된 맛집',
      tags: ['시원함', '깔끔함'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
    {
      placeName: '광장시장 빈대떡',
      status: '운영 중',
      address: '서울 종로구 창신동 88',
      summary: '바삭바삭한 전통 빈대떡 맛집',
      tags: ['고소함', '전통적'],
    },
  ]

  return (
    <div className='relative overflow-auto max-h-[100vh] scrollbar-hide max-w-[768px] w-full mx-auto bg-white'>
      <div className='w-full h-[19.312vh] bg-primary'></div>
      <img
        className='absolute top-[19.312vh] right-[30px] transform -translate-y-1/2 w-[25.64vw] max-w-[25%] max-h-[25%] h-[25.64vw] rounded-full bg-primary-200 border-[2px] border-white'
        src={DefaultImg}
      />
      <div className='flex flex-col gap-[1.57vh] w-full h-[18.25vh] pl-[30px]'>
        <h3 className='mt-[4.74vh] font-[Bold] text-[24px]'>숙멋사</h3>
        <p className='text-[1rem]'>따뜻함을 좋아하는 감성탐험가</p>
      </div>
      <div className='bg-[#f8f8f8] flex flex-col justify-center pt-[1.78vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>북마크</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='flex flex-col gap-[2.47vw] ml-[3.85vw] py-[3.1vh]'>
          <p className='text-gray-200 text-[12px]'>스크랩한 글이 이곳에 저장됩니다.</p>
          <div className='flex gap-[3.33vw] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' urllist={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' urllist={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' urllist={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' urllist={urlList} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-[4.38vh] mb-[10vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>감정보관함</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='mt-[3.08vh]'>
          <CardCarousel placeData={placeData} />
        </div>
      </div>
      <Footer selectedMenu='my' />
    </div>
  )
}

export default Mypage
