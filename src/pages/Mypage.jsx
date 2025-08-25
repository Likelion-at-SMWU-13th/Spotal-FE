import DefaultImg from '@/assets/DefaultProfileImg.svg'
import ImageSlider from '@/components/community/ImageSlider'
import Footer from '@/components/shared/Footer.jsx'
import { CardCarousel } from '@/components/mypage/CardCarousel.jsx'
import { baseURL } from './Signup'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Mypage = () => {
  const userId = Number(localStorage.getItem('user.id'))
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = () => {
    axios
      .get(`${baseURL}/mypage/${userId}/`)
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getUserInfo()
  }, [userId])

  return (
    <div className='relative overflow-auto max-h-[100vh] min-h-screen scrollbar-hide max-w-[768px] w-full mx-auto bg-white'>
      <div className='w-full h-[19.312vh] md:h-[22vh] bg-primary'></div>
      <img
        className='absolute top-[19.312vh] right-[7.5vw] md:right-[3.3rem] transform -translate-y-1/2 w-[25.64vw] h-[25.64vw] md:w-[11rem] md:h-[11rem] rounded-full bg-primary-200 border-[2px] border-white'
        src={DefaultImg}
      />
      <div className='flex flex-col gap-[1.57vh] w-full h-[22vh] pl-[30px]'>
        <h3 className='mt-[4.74vh] font-[Bold] text-[24px]'>{userInfo?.user?.nickname ?? ''}</h3>
        <p className='text-[1rem] whitespace-pre-line pb-[2rem]'>
          {userInfo?.user?.detail?.trim() === ''
            ? '당신의 기억을 따라가다 보면.. \n 어느새 당신의 취향과 마주하게 될 거예요!'
            : userInfo?.user?.detail}
        </p>
      </div>
      <div className='bg-[#f8f8f8] flex flex-col justify-center pt-[1.78vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>북마크</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='flex flex-col ml-[8vw] md:ml-[2.5rem] py-[3.1vh]'>
          <p className='text-gray-200 text-[12px]'>스크랩한 글이 이곳에 저장됩니다.</p>
          {userInfo?.bookmarks?.length > 0 && (
            <div className='flex gap-[3.33vw] mt-[5px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {userInfo?.bookmarks?.map((b) => {
                return (
                  <div key={b.memory_id} className='shrink-0 snap-start overflow-hidden'>
                    <ImageSlider w='96px' urllist={b?.images} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col mt-[4.38vh] mb-[10vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>감정보관함</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='mt-[3.08vh]'>
          <CardCarousel placeData={userInfo?.saved_places ?? []} />
        </div>
      </div>
      <Footer selectedMenu='my' />
    </div>
  )
}

export default Mypage
