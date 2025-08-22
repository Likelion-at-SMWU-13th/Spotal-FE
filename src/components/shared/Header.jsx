import Return from '../../assets/return.svg'
import { useNavigate } from 'react-router-dom'

const Header = ({ label }) => {
  const navigate = useNavigate()
  return (
    <div className='fixed top-0 z-50 text-[#364153] bg-white flex items-center w-full max-w-[768px] h-[7.11vh] border-b-[1px]  border-b-grey-100 shadow-[0_2px_2px_#EFEFEF] left-1/2 -translate-x-1/2'>
      <img
        src={Return}
        alt='return'
        onClick={() => navigate(-1)}
        className='absolute left-8 top-1/2 -translate-y-1/2 cursor-pointer'
      />
      <p className='mx-auto font-[ExtraBold] text-[18px]'>{label}</p>
    </div>
  )
}

export default Header
