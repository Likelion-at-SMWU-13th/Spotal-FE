import { useState } from 'react'
const EmotionCard = ({ placeName, status, address, summary, tags = [], url }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpanded2, setIsExpanded2] = useState(false)

  return (
    <div className='bg-white w-[92.56vw] md:w-[40rem] py-[1.78vh] flex items-center justify-center gap-[2.56vw] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.1)]'>
      <img
        src={url}
        className='w-[35.9vw] md:w-[10rem] h-[14.34vh] rounded-[10px] bg-gray-100 object-cover'
      />
      <div className='flex flex-col gap-[0.91vh]'>
        <div
          className='flex justify-between items-center bg-primary-300 w-[48.2vw] md:w-[25rem] px-[4.36vw] py-[1.3vh] rounded-[10px]'
          onClick={() => setIsExpanded2(true)}
        >
          <h2
            className={`font-[SemiBold] text-gray-700 text-[10px] truncate min-w-0 hover:whitespace-pre-wrap hover:overflow-visible ${isExpanded2 ? 'whitespace-pre-wrap overflow-visible' : 'truncate'}`}
          >
            {placeName}
          </h2>
          <div
            className={`flex items-center justify-center rounded-full w-[11.7vw] max-w-[50px] sm:min-w-[50px] md:min-w-[50px] min-w-[11.7vw] h-[2vh] border select-none text-[8px] ${
              status === '폐업함'
                ? 'bg-[#FDF2F8] text-[#BE195D] border-[#BE195D]'
                : status === '이전함'
                  ? 'bg-[#EFFDF4] text-[#17A34A] border-[#17A34A]'
                  : 'bg-[#DBE9FE] text-[#2463EB] border-[#2463EB]'
            }`}
          >
            {status}
          </div>
        </div>
        <div className='flex flex-col gap-[0.6vh] bg-primary-300 rounded-[10px] w-[48.2vw] md:w-[25rem] px-[4.36vw] py-[1.3vh]'>
          <div className='flex items-baseline w-[40vw]'>
            <strong className='font-[Bold] text-[10px] text-gray-700 shrink-0 mr-1'>주소:</strong>
            <span className='font-[SemiBold] text-[10px] text-gray-700 whitespace-pre-wrap'>
              {address}
            </span>
          </div>

          <div className='flex items-baseline w-[40vw]' onClick={() => setIsExpanded(true)}>
            <strong className='font-[Bold] text-[10px] text-gray-700 shrink-0 mr-1'>요약:</strong>
            <span
              className={`font-[SemiBold] text-[10px] text-gray-700 truncate min-w-0 hover:whitespace-pre-wrap hover:overflow-visible ${
                isExpanded ? 'whitespace-pre-wrap overflow-visible' : 'truncate'
              }`}
            >
              {summary}
            </span>
          </div>
          <div className='flex gap-[1.28vw] flex-wrap'>
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className='flex justify-center items-center text-[8px] text-gray-600 border border-[#ADADAD] w-[11.7vw] max-w-[50px] h-[2vh] rounded-[50px] select-none bg-[#FFFEFC]'
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmotionCard
