import { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import PostDefaultImg from '@/assets/PostDefaultImg.svg'

function ImageSlider({ urllist = [], w }) {
  const [current, setCurrent] = useState(0)
  const [imageUrlList, setImageUrlList] = useState([])
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className='flex'>
        <ul className='absolute bottom-[35px] left-1/2 -translate-x-1/2 !m-0 !p-0 !flex !gap-[8px] [&>li]:!m-0 [&>li]:!w-auto [&>li]:!h-auto [&>li>button]:!p-0'>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={
          i === current
            ? 'w-[20px] h-[4px] rounded-[100px] bg-white'
            : 'w-[4px] h-[4px] rounded-full bg-grey-200'
        }
      ></div>
    ),
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
  }

  useEffect(() => {
    if (!Array.isArray(urllist) || urllist.length === 0) {
      setImageUrlList([PostDefaultImg])
    } else if (typeof urllist[0] === 'string') {
      setImageUrlList(urllist)
    } else if (typeof urllist[0] === 'object' && urllist[0]?.image_url) {
      setImageUrlList(urllist.map((u) => u.image_url))
    }
  }, [urllist])

  return (
    <div
      className='relative mt-[1.6vh] [&>div]:rounded-[10px] [&>div]:overflow-hidden'
      style={{ width: w, maxWidth: '31.5rem', overflow: 'hidden', borderRadius: '10px' }}
    >
      <Slider {...settings}>
        {imageUrlList.map((url, i) => (
          <div
            key={`${urllist}-${i}`}
            className='flex justify-center items-center [&>div]:rounded-[10px] [&>div]:overflow-hidden outline-none [--tw-tap-highlight-color:transparent]'
          >
            <div className='justify-center items-center [&>div]:rounded-[10px] [&>div]:overflow-hidden'>
              <img
                className='object-cover bg-grey-100 rounded-[10px] overflow-hidden aspect-square'
                style={{ width: w }}
                alt='골목 과거 사진'
                src={url}
                loading='lazy'
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
