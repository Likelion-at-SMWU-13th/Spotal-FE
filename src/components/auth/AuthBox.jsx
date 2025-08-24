import React from 'react'

const LoginBox = ({ label, value, onChange, name }) => {
  return (
    <div className='flex flex-col  gap-[0.473vh]'>
      <p className='font-[SemiBold] text-grey-700 text-[17px]'>{label}</p>
      <input
        className='w-[88.2vw] md:w-[40rem] h-[5.213vh] min-h-[44px] border-solid border-[2px] rounded-[7px] border-grey-100 focus:border-primary focus:outline-none p-[0.5rem]'
        name={name}
        value={value}
        onChange={onChange}
        type={label.includes('비밀번호') ? 'password' : 'text'}
        autoComplete='off'
      />
    </div>
  )
}

export default LoginBox
