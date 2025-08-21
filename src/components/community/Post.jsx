import React, { useState } from 'react'
import Tag from './Tag.jsx'
import ImageSlider from './ImageSlider.jsx'
import PostMenu from './PostMenu.jsx'

export const getName = (tag) => {
  if (Array.isArray(tag)) {
    return tag.map((e) => e.name)
  } else return [tag]
}

const Post = ({ text, urllist, emotionTags, locationTags }) => {
  const [expanded, setExpanded] = useState(false)
  const displayedText = expanded ? text : text.length > 25 ? text.slice(0, 25) : text

  const tagList = [...getName(emotionTags), ...getName(locationTags)]

  return (
    <div className='flex flex-col relative px-[3.846vw] w-[76.67vw] rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] bg-white'>
      <div className='flex justify-between items-center ml-[0.5vw] mr-[2vw] mt-[1.6vh]'>
        <div className='flex gap-[0.5rem] items-center'>
          <img className='w-[5.13vw] h-[5.13vw] rounded-full bg-grey-100 border-none' />
          <p className='font-[Medium] text-[0.75rem]'>사용자 1</p>
        </div>
        <PostMenu />
      </div>
      <ImageSlider w='68.974vw' h='29.146vh' urllist={urllist} />
      <div className='flex mt-[1.9vh] text-[0.75rem]'>
        <p className='whitespace-pre-line'>{displayedText}</p>
        {text.length > 25 && (
          <button className='text-grey-300 ml-[0.2rem]' onClick={() => setExpanded(true)}>
            {expanded ? '' : '더 보기'}
          </button>
        )}
      </div>
      <div className='flex gap-[6px] mt-[0.947vh] mb-[1.78vh]'>
        {tagList.map((tag, idx) => (
          <div key={idx}>
            <Tag label={tag} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post
