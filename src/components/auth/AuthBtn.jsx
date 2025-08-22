import React from 'react'

const AuthBtn = ({ onClick, text, disabled }) => {
  return (
    <div>
      <button
        className={`w-[88.2vw] md:w-[40rem] h-[6.04vh] min-[51px] rounded-[10px] bg-primary text-white text-[1.25rem] font-[SemiBold] cursor-pointer disabled:bg-primary-200 disabled:cursor-not-allowed`}
        onClick={onClick}
        disabled={disabled}
        type='button'
      >
        {text}
      </button>
    </div>
  )
}

export default AuthBtn
