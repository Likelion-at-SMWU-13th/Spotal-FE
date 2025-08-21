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
    <div className='flex pl-[5.9vw] pt-[25.48px] bg-white'>
      <img
        className='mr-[3.44vw] w-[6.58px] h-[15.28px] hover:cursor-pointer'
        src={Return}
        alt='Return'
        onClick={onBack}
      />
      <div className='flex items-center justify-between gap-[2.56vw]'>
        {segments.map((_, i) => (
          <div
            key={i}
            className='h-[0.59vh] rounded-[12.8vw] bg-grey-200 overflow-hidden'
            style={{ width: '25.64vw' }}
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
