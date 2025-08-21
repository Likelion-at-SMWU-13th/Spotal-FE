import React from 'react'

const Button = ({ type, label, onClick = () => {}, disabled = false }) => {
  return (
    <div>
      <button
        type={type}
        className={`w-full py-2.5 rounded-[10px] text-base cursor-pointer select-none transition-colors duration-300 hover:bg-primary hover:text-white ${disabled ? 'bg-grey-100 text-grey-200' : 'bg-primary text-white'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  )
}

export default Button
