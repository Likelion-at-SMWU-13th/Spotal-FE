import React, { useState, useEffect, useRef } from 'react'
import DropdownSign from '@/assets/DropdownSign.svg'
import { useOutsideClick } from '@/hooks/useOutsideClick.jsx'

export const emotionList = ['전체', '정겨움', '편안함', '조용함', '활기참', '소박함', '세심함']
export const locationList = [
  '전체',
  '이태원',
  '한남동',
  '후암동',
  '효창동',
  '용문동',
  '청파동',
  '해방촌',
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
    options = emotionList
  } else if (label === '동네') {
    options = locationList
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className={`flex items-center justify-center w-[18.72vw] h-[3.08vh] bg-grey-100 cursor-pointer rounded-[5px] font-[SemiBold] text-[12px] text-grey-700 ${filtered ? 'bg-primary-300' : 'bg-grey-100'}`}
      >
        {displayLabel}
        <img src={DropdownSign} />
      </button>

      {open && (
        <div className='flex flex-col bg-grey-100 rounded-[10px] w-[18.72vw] mt-[1px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full left-0 z-40'>
          {options.map((opt) => (
            <button
              className={`hover:bg-primary-300 p-[5px] active:bg-primary-300 ${
                selected === opt ? 'bg-primary-300' : 'bg-grey-100'
              }`}
              key={opt}
              onClick={() => {
                if (opt === '전체') {
                  setDisplayLabel(label)
                  setFiltered(false)
                } else {
                  setDisplayLabel(opt)
                  setFiltered(true)
                }
                // setOpen(false)
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
