import { Link } from 'react-router-dom'
import My from '@/assets/My.svg?react'
import Home from '@/assets/Home.svg?react'
import Community from '@/assets/Community.svg?react'

const Footer = ({ selectedMenu = '' }) => {
  return (
    <div className='fixed bottom-0 z-50 bg-white flex items-center justify-between w-full max-w-[768px] pr-[7.82vw] pl-[7.82vw] h-[7.464vh] rounded-t-[20px] left-1/2 transform -translate-x-1/2 shadow-[0_-1px_5px_rgba(0,0,0,0.1)] '>
      <Link to={'/home'}>
        <Home className={selectedMenu === 'home' ? 'text-primary' : 'text-grey-200'} />
      </Link>
      <Link to={'/post'}>
        <Community className={selectedMenu === 'community' ? 'text-primary' : 'text-grey-200'} />
      </Link>
      <Link to={'/mypage'}>
        <My className={selectedMenu === 'my' ? 'text-primary' : 'text-grey-200'} />
      </Link>
    </div>
  )
}

export default Footer
