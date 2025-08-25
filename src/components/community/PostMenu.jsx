import React, { useState, useEffect, useRef } from 'react'
import PostMenuSvg from '@/assets/PostMenu.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useOutsideClick from '@/hooks/useOutsideClick'
import { baseURL } from '@/pages/Signup'
import axios from 'axios'
import MenuSign from '@/assets/MenuSign.svg?react'
import { toast } from 'sonner'

const PostMenu = ({ memory_id }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useOutsideClick(rootRef, () => setOpen(false), open)
  const navigate = useNavigate()

  const deletePost = () => {
    axios
      .delete(`${baseURL}/community/memories/${memory_id}/`)
      .then((response) => {
        console.log(response)
        toast('🟢 게시글 삭제가 완료되었습니다.')
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        toast('🔴 게시글을 삭제하지 못하였습니다.')
      })
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className='cursor-pointer'
      >
        <img src={PostMenuSvg} alt='메뉴 열기' />
      </button>
      {open && (
        <div className='flex flex-col bg-white rounded-[10px] w-[18.72vw] max-w-[100px] mt-[1px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full right-[-10px] z-40 shadow-[0_4px_4px_rgba(0,0,0,0.1)]'>
          <button
            className='flex justify-center items-center gap-[10px] py-[0.5rem] hover:bg-primary-300 cursor-pointer border-b-[1px] border-gray-100 active:bg-primary-300'
            onClick={() => navigate(`/editpage/${memory_id}`)}
          >
            수정하기
            <MenuSign />
          </button>
          <button
            className='flex justify-center items-center gap-[10px] py-[0.5rem] hover:bg-primary-300 cursor-pointer active:bg-primary-300'
            onClick={deletePost}
          >
            삭제하기
            <MenuSign />
          </button>
        </div>
      )}
    </div>
  )
}

export default PostMenu
