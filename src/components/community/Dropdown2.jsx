import { useState, useEffect, useRef } from 'react'
import TagBtn from './TagBtn.jsx'
import { useOutsideClick } from '@/hooks/useOutsideClick.jsx'
import ChevronUp from '@/assets/ChevronUp.svg'
import ChevronDown from '@/assets/ChevronDown.svg'

const Dropdown2 = ({ placeholder, options = [], value, onChange, name }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const rootRef = useRef(null)
  useOutsideClick(rootRef, () => setOpen(false), open)

  const handleClick = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option))
    } else {
      if (selected.length >= 3) return
      setSelected([...selected, option])
    }
  }

  useEffect(() => {
    const value = selected.join(', ')
    onChange?.({ target: { name, value: value } })
  }, [selected, onChange, name])

  return (
    <div ref={rootRef} className='relative'>
      <div
        className={`flex w-[71.794vw] h-[5.213vh] bg-[#ffffff] rounded-[9px] border-[0.9px] py-[0.5rem] px-[0.4rem] cursor-text ${open ? 'border-primary' : 'border-gray-200'}`}
        onFocus={() => setOpen(true)}
      >
        <input
          type='text'
          className='w-full focus:outline-none'
          name={name}
          value={Array.isArray(value) ? value.join(', ') : value}
          placeholder={placeholder}
          readOnly
        />
        <img
          className='w-[12px] mr-[4px]'
          src={open ? ChevronUp : ChevronDown}
          alt=''
          onClick={() => setOpen((o) => !o)}
        />
      </div>

      {open && (
        <div className='absolute top-full left-0 mt-[4px] z-40 grid grid-cols-3 gap-x-[3.59vw] gap-y-[2.843vh] rounded-[9px] px-[1.794vw] py-[2.37vh] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.2)]'>
          {options.map((opt) => {
            const isSelected = selected.includes(opt)
            return (
              <TagBtn
                key={opt}
                label={opt}
                isSelected={isSelected}
                onClick={() => handleClick(opt)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown2
