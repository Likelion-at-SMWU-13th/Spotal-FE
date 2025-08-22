import Dropdown from '@/components/community/Dropdown.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import PostList from '@/components/community/PostList.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './Signup'

const CommunityMyPostList = () => {
  const [myPostData, setMyPostData] = useState([])
  const userId = localStorage.getItem('user.id')

  const getMyPost = () => {
    axios
      .get(`${baseURL}/community/my/?user_id=${userId}`)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.message)
        console.log(res.data.data)
        const posts = Array.isArray(res.data?.data) ? res.data.data : []
        setMyPostData(posts)
      })
      .catch((err) => {
        console.log(err)
        setMyPostData([])
      })
  }

  useEffect(() => {
    getMyPost()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='max-w-[768px] w-full flex flex-col items-center justify-center bg-white'>
        <Header2 label1={'내 글'} label2={'새 글 작성'} link={'/writepage'} />
        <div className='pt-[7.11vh] pb-[10vh] bg-white min-h-screen'>
          <div className='flex justify-between my-[2.49vh]'>
            <div className='flex gap-[1.54vw] '>
              <Dropdown label={'감정'} />
              <Dropdown label={'동네'} />
            </div>
          </div>
          <PostList postData={myPostData} />
        </div>
        <Footer selectedMenu={'community'} />
      </div>
    </div>
  )
}

export default CommunityMyPostList
