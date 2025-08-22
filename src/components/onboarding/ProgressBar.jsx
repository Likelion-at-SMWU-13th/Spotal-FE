import Return from '../../assets/return.svg'
import { useState, useEffect } from 'react'

const ProgressBar = ({ step, totalSteps = 3, onBack }) => {
  const [mounted, setMounted] = useState(false)
  const segments = Array.from({ length: totalSteps })
  useEffect(() => {
    // 첫 프레임(0%)로 그린 뒤, 다음 프레임에 채우기 시작
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className='flex justify-center items-center pt-[95px] bg-white'>
      <img
        className='w-full mr-[1.3rem] h-[15.28px] hover:cursor-pointer'
        src={Return}
        alt='Return'
        onClick={onBack}
      />
      <div className='flex grid-cols-3 items-center max-w-[768px] justify-between gap-[1rem]'>
        {segments.map((_, i) => (
          <div
            key={i}
            className='h-[0.59vh] rounded-[12.8vw] bg-grey-200 overflow-hidden'
            style={{ width: '25.64vw', maxWidth: '12.5rem' }}
          >
            <div
              className={`h-full rounded-[12.8vw] bg-primary transition-all duration-500`}
              style={{ width: mounted && i <= step ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
