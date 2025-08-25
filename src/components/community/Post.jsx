import React, { useEffect, useState } from 'react'
import Tag from './Tag.jsx'
import ImageSlider from './ImageSlider.jsx'
import PostMenu from './PostMenu.jsx'
import BookMark from '@/assets/BookMark.svg?react'
import axios from 'axios'
import { baseURL } from '@/pages/Signup.jsx'

const Post = ({ text, urllist, emotionTags, locationTags, memory_id, userId, nickname }) => {
  const [expanded, setExpanded] = useState(false)
  const displayedText = expanded ? text : text.length > 25 ? text.slice(0, 25) : text
  const currentUserId = localStorage.getItem('user.id')
  const isUser = currentUserId == userId
  const [isMarked, SetIsMarked] = useState(false)
  const [bookmarkId, SetBookmarkId] = useState(null)

  useEffect(() => {
    let cancelled = false
    axios
      .get(`${baseURL}/community/bookmarks/?user_id=${currentUserId}`)
      .then((res) => {
        const marked = res.data.find((id) => Number(id?.memory) === Number(memory_id))
        const sameUser = res.data.find((user) => Number(user?.user) === Number(currentUserId))
        if (cancelled) return
        if (marked && sameUser) {
          SetIsMarked(true)
          console.log(res)
          SetBookmarkId(marked.bookmark_id)
        } else {
          SetIsMarked(false)
          SetBookmarkId(null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      cancelled = true
    }
  }, [userId, memory_id, baseURL, currentUserId, bookmarkId])

  const handleBookmark = (isMarked) => {
    if (!isMarked) {
      axios
        .post(`${baseURL}/community/bookmarks/create/`, {
          user_id: currentUserId,
          memory: memory_id,
        })
        .then((res) => {
          SetIsMarked(true)
          SetBookmarkId(res.data.bookmark_id)
          console.log(res.data)
          console.log(res.data.bookmark_id)
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .delete(`${baseURL}/community/bookmarks/${bookmarkId}/delete/?user_id=${currentUserId}`)
        .then((res) => {
          SetIsMarked(false)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className='flex flex-col gap-[0.8vh] relative px-[3.846vw] md:px-[40px] w-[76.67vw] md:w-[36.7rem] rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] bg-white'>
      <div className='flex justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]  mt-[1.6vh]'>
        <div className='flex gap-[0.5rem] items-center'>
          <img className='w-[5.13vw] h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-grey-100 border-none' />
          <p className='font-[Medium] text-[0.75rem]'>{nickname}</p>
        </div>
        {isUser && <PostMenu memory_id={memory_id} />}
      </div>
      <div className='h-auto'>
        <ImageSlider w='68.974vw' urllist={urllist} />
      </div>
      <div className='h-auto m-0 my-1'>
        <p className='whitespace-pre-line text-[12px]'>{displayedText}</p>
        <div className='h-auto'>
          {text.length > 25 && (
            <button
              className='text-grey-300 ml-[0.1rem] break-keep text-[12px]'
              onClick={() => setExpanded(true)}
            >
              {expanded ? '' : '더보기'}
            </button>
          )}
        </div>
      </div>
      <div className='flex justify-between items-center mb-[1.78vh] md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]'>
        <div className='flex gap-[6px]'>
          {emotionTags.map((tag, idx) => (
            <div key={idx}>
              <Tag label={tag} />
            </div>
          ))}
          <Tag label={locationTags} />
        </div>
        {isUser || (
          <BookMark
            className={`cursor-pointer stroke-[0.3px] h-[1.42rem] mr-[-8px] ${
              isMarked
                ? '[&_*]:fill-primary [&_*]:stroke-primary'
                : '[&_*]:fill-gray-200 [&_*]:stroke-gray-200'
            }`}
            onClick={() => handleBookmark(isMarked)}
          />
        )}
      </div>
    </div>
  )
}

export default Post
