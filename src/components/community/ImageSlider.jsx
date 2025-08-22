import { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

function ImageSlider({ urllist = [], w, h }) {
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
    if (urllist) {
      setImageUrlList(urllist.map((u) => u.image_url))
    }
  }, [urllist])

  return (
    <div
      className='relative mt-[1.6vh] rounded-[10px] overflow-hidden'
      style={{ width: w, height: h, maxWidth: '31.5rem' }}
    >
      <Slider {...settings}>
        {imageUrlList.map((url, i) => (
          <div
            key={`${urllist}-${i}`}
            className='h-full outline-none [--tw-tap-highlight-color:transparent]'
          >
            <img
              className='block w-full h-full object-cover bg-grey-100'
              style={{ width: w, height: h }}
              alt='골목 과거 사진'
              src={url}
              loading='lazy'
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
