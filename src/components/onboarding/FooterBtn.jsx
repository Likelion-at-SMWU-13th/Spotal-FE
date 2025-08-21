import React, { useState } from 'react'

const FooterBtn = ({ text, onClick, className = '' }) => {
  const [pressed, setPressed] = useState(false)

  const handleClick = () => {
    setPressed(true)
    setTimeout(() => {
      setPressed(false)
      onClick?.()
    }, 120)
  }
  return (
    <div>
      <button
        type='button'
        onClick={handleClick}
        className={`text-[20px] cursor-pointer transition-colors
        ${pressed ? 'text-primary' : 'text-grey-200'} hover:text-primary ${className}`}
      >
        {text}
      </button>
    </div>
  )
}

export default FooterBtn
