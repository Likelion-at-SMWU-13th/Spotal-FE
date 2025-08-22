import React, { useState, useEffect, useRef } from 'react'
import DropdownSign from '@/assets/DropdownSign.svg'
import { useOutsideClick } from '@/hooks/useOutsideClick.jsx'

export const emotionList = [
  { emotion_id: 1, name: '정겨움' },
  { emotion_id: 2, name: '편안함' },
  { emotion_id: 3, name: '조용함' },
  { emotion_id: 4, name: '활기참' },
  { emotion_id: 5, name: '소박함' },
  { emotion_id: 6, name: '세심함' },
]

export const locationList = [
  { location_id: 1, name: '이태원' },
  { location_id: 2, name: '한남동' },
  { location_id: 3, name: '후암동' },
  { location_id: 4, name: '효창동' },
  { location_id: 5, name: '용문동' },
  { location_id: 6, name: '청파동' },
  { location_id: 7, name: '해방촌' },
]

const Dropdown = ({ label }) => {
  const [open, setOpen] = useState(false)

  const [displayLabel, setDisplayLabel] = useState(label)
  const [filtered, setFiltered] = useState(false)
  const [selected, setSelected] = useState('전체')

  const rootRef = useRef(null)
  useOutsideClick(rootRef, () => setOpen(false), open)

  let options = []
  if (label === '감정') {
    options = emotionList.map((e) => e.name)
  } else if (label === '동네') {
    options = locationList.map((l) => l.name)
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className={`flex items-center justify-center w-[18.72vw] max-w-[6rem] h-[1.5rem] bg-grey-100 cursor-pointer rounded-[5px] font-[SemiBold] text-[12px] text-grey-700 ${filtered ? 'bg-primary-300' : 'bg-grey-100'}`}
      >
        {displayLabel}
        <img src={DropdownSign} />
      </button>

      {open && (
        <div className='flex flex-col bg-grey-100 rounded-[10px] w-[18.72vw] max-w-[6rem] mt-[1px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full left-0 z-40'>
          <button
            className={`hover:bg-primary-300 p-[5px] active:bg-primary-300 ${
              selected === '전체' ? 'bg-primary-300' : 'bg-grey-100'
            }`}
            onClick={() => {
              setDisplayLabel(label)
              setFiltered(false)
              setOpen(false)
            }}
          >
            전체
          </button>
          {options.map((opt) => (
            <button
              className={`hover:bg-primary-300 p-[5px] active:bg-primary-300 ${
                selected === opt ? 'bg-primary-300' : 'bg-grey-100'
              }`}
              key={opt}
              onClick={() => {
                setDisplayLabel(opt)
                setFiltered(true)
                setOpen(false)
                setSelected(opt)
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
