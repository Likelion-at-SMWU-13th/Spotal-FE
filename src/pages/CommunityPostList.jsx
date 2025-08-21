import Dropdown from '@/components/community/Dropdown.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import { useNavigate } from 'react-router-dom'
import PostList from '@/components/community/PostList.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { baseURL } from './Signup'

const CommunityPostList = () => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState([])

  const getPost = () => {
    axios
      .get(`${baseURL}/community/memories`)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.message)
        console.log(res.data.data)
        const posts = Array.isArray(res.data?.data) ? res.data.data : []
        setPostData(posts.slice().reverse())
      })
      .catch((err) => {
        console.log(err)
        setPostData([])
      })
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div>
      <Header2 label1={'피드'} label2={'내 글 모음'} link={'/mypost'} />
      <div className='px-[10.769vw] pt-[7.11vh] pb-[10vh] bg-white'>
        <div className='flex justify-between my-[2.49vh]'>
          <div className='flex gap-[1.54vw] '>
            <Dropdown label={'감정'} />
            <Dropdown label={'동네'} />
          </div>
          <button
            className='w-[18.72vw] h-[3.08vh] bg-primary-300 border-primary border-[0.5px] rounded-[5px] font-[SemiBold] text-[12px] text-primary'
            onClick={() => navigate('/writepage')}
          >
            새 글 작성
          </button>
        </div>
        <PostList postData={postData} />
      </div>
      <Footer selectedMenu={'community'} />
    </div>
  )
}

export default CommunityPostList
