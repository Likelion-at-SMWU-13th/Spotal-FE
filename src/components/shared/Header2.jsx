import React from 'react'
import Return from '../../assets/return.svg'
import { Link, useNavigate } from 'react-router-dom'

const Header2 = ({ label1, label2, link }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='fixed top-0 z-50 text-[#364153] bg-white flex items-center w-[100vw] h-[7.11vh] border-b-[1px] border-b-grey-100 shadow-[0_2px_2px_#EFEFEF] left-1/2 -translate-x-1/2'>
        <img
          src={Return}
          alt='return'
          className='absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <p className='mx-auto font-[ExtraBold] text-[18px]'>{label1}</p>
        <Link
          to={link}
          className='absolute right-[8.076vw] top-1/2 -translate-y-1/2 font-[SemiBold] text-[18px] text-primary cursor-pointer'
        >
          {label2}
        </Link>
      </div>
    </div>
  )
}

export default Header2
