import { useState } from 'react'
import BookMark from '@/assets/BookMark.svg'
import BookMark2 from '@/assets/BookMark2.svg'
import RecommendedInfo from './RecommendedInfo'
import NoResult from '@/assets/NoResult.svg'

const RecommendedPlaces = ({ placeName, status, address, summary, tags = [], image = null }) => {
  const [isMarked, setIsMarked] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState(image || NoResult)

  const handleOpenInfo = () => {
    setIsInfoOpen(true)
  }
  const handleCloseInfo = () => {
    setIsInfoOpen(false)
  }

  return (
    <>
      <div
        className='max-w-[500px] min-w-[300px] w-[80%] bg-white rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] p-6 pb-4 cursor-pointer'
        onClick={handleOpenInfo}
      >
        <img
          src={image}
          className='bg-grey-100 w-[80vw] h-[150px] rounded-[10px] mb-2'
          onError={(e) => {
            e.currentTarget.src = NoResult
            setImgSrc(NoResult)
          }}
        ></img>
        <div className='flex justify-between items-center mb-2 pt-1 pl-1 rounded-[10px]'>
          <h2 className='m-0 font-bold text-xl'>{placeName}</h2>
          <img
            src={isMarked ? BookMark2 : BookMark}
            onClick={(e) => {
              e.stopPropagation()
              setIsMarked((prev) => !prev)
            }}
          />
        </div>
        <div className='flex gap-2 flex-wrap'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='text-xs text-[#FFBA42] border border-[#FFBA42] px-2 py-1 rounded-[50px] select-none bg-[#FFF8EC]'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {isInfoOpen && (
        <RecommendedInfo
          placeName={placeName}
          status={status}
          address={address}
          summary={summary}
          tags={tags}
          image={imgSrc}
          onClose={handleCloseInfo}
        />
      )}
    </>
  )
}

export default RecommendedPlaces
