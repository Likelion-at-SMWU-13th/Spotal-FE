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

  const [emotionId, setEmotionId] = useState(null)
  const [locationId, setLocationId] = useState(null)

  const postUrl = (emotionId, locationId) => {
    const url = new URL(`${baseURL}/community/memories`)
    const params = url.searchParams

    if (emotionId != null) params.set('emotion_ids', emotionId)
    if (locationId != null) params.set('location_id', locationId)

    return url.toString()
  }

  const getPost = () => {
    axios
      .get(`${postUrl(emotionId, locationId)}`)
      .then((res) => {
        const posts = Array.isArray(res.data?.data) ? res.data.data : []
        setPostData(posts)
      })
      .catch((err) => {
        console.log(err)
        setPostData([])
      })
  }

  useEffect(() => {
    getPost()
  }, [locationId, emotionId])

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='max-w-[768px] w-full flex flex-col items-center justify-center bg-white'>
        <Header2 label1={'피드'} label2={'내 글 모음'} link={'/mypost'} />
        <div className='pt-[7.11vh] pb-[10vh] bg-white min-h-screen'>
          <div className='flex justify-between my-[2.49vh]'>
            <div className='flex gap-[1.54vw] '>
              <Dropdown onSelect={(id) => setEmotionId(id)} label={'감정'} />
              <Dropdown onSelect={(id) => setLocationId(id)} label={'동네'} />
            </div>
            <button
              className='w-[18.72vw] max-w-[6rem] h-[1.5rem] bg-primary-300 border-primary border-[0.5px] rounded-[5px] font-[SemiBold] text-[12px] text-primary cursor-pointer'
              onClick={() => navigate('/writepage')}
            >
              새 글 작성
            </button>
          </div>
          <PostList postData={postData} />
        </div>
        <Footer selectedMenu={'community'} />
      </div>
    </div>
  )
}

export default CommunityPostList
