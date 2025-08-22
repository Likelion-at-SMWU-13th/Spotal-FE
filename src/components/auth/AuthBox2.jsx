const AuthBox2 = ({ label, bg, onClick, value, onChange, name }) => {
  return (
    <div className='flex flex-col gap-[0.6vh]'>
      <p className='font-[SemiBold] text-grey-700 text-[17px]'>{label}</p>
      <div className='flex items-center justify-between w-[88.2vw] md:w-[40rem] h-[5.213vh] min-h-[44px] border-solid border-[2px] rounded-[7px] border-grey-100 focus-within:border-primary p-[0.7rem]'>
        <input
          className='w-[67.7vw] md:w-[30rem] focus:outline-none'
          type='text'
          value={value}
          onChange={onChange}
          name={name}
        />
        <button
          className={`w-[16.49vw] max-w-[63px] h-[2.844vh] min-h-[24px] ${bg} rounded-[7px] font-[SemiBold] text-[0.625rem] cursor-pointer`}
          onClick={onClick}
          type='button'
          disabled={!value.trim()} // 값 없으면 중복확인 막음
        >
          중복확인
        </button>
      </div>
    </div>
  )
}

export default AuthBox2
