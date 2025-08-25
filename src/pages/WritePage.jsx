import { useEffect, useState, useRef } from 'react'
import Header from '@/components/shared/Header.jsx'
import Footer from '@/components/shared/Footer.jsx'
import Dropdown2 from '@/components/community/Dropdown2.jsx'
import { emotionList, locationList } from '@/components/community/Dropdown.jsx'
import Button from '@/components/shared/Button.jsx'
import ImageUploader from '@/components/community/ImageUploader.jsx'
import { useFormFilled } from '@/hooks/useFormFilled'
import { baseURL } from './Signup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const WritePage = () => {
  const labelClass = 'font-[Medium] text-[1rem]'
  const divClass = 'flex flex-col gap-[1.54vh]'
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const scrollTo = () => {
    const dropdown = dropdownRef.current
    if (!dropdown) return
    const y = dropdown.getBoundingClientRect().top + window.scrollY + 200
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const { values, handleChange, isFilled } = useFormFilled({
    text: '',
    location: null,
    emotion: [],
  })

  const postWriteRequest = () => {
    const formData = new FormData()
    formData.append('content', values.text)
    ;(values.emotion ?? []).forEach((id) => {
      formData.append('emotion_id', String(id))
    })

    if (values.location != null) {
      formData.append('location_id', String(values.location))
    }

    const flatFiles = (files ?? []).flat()
    flatFiles.filter((f) => f instanceof File).forEach((f) => formData.append('images', f))
    formData.append('user_id', localStorage.getItem('user.id'))
    console.log('images:', files)
    axios
      .post(`${baseURL}/community/memories/`, formData)
      .then((res) => {
        console.log(res)
        navigate(-1)
      })
      .catch((err) => {
        console.log('status', err.response?.status)
        console.log('body', err.response?.data)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full max-w-[768px] bg-white min-h-screen'>
        <Header label={'글 작성하기'} />
        <div className='bg-white flex justify-center pb-[13vh]'>
          <div className='w-[80%] mt-[13.98vh] bg-primary-300 rounded-[10px] '>
            <form className='flex flex-col justify-center align-middle'>
              <div className='flex flex-col gap-[2.3vh] self-center py-10 mx-5'>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>이미지 추가</label>
                  <ImageUploader urllist={images} onFilesChange={setFiles} onRemove={() => {}} />
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>내용 작성</label>
                  <textarea
                    className='w-[71.794vw] max-w-[36rem] md:w-[36rem] h-[9.834vh] bg-[#ffffff] focus:outline-none focus:border-primary rounded-[9px] resize-none border-[0.9px] border-grey-200 py-[0.9vh] px-[0.5rem]'
                    placeholder='작성할 내용을 입력하세요'
                    name='text'
                    value={values.text}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>장소 태그 추가</label>
                  <div ref={dropdownRef} onClick={scrollTo}>
                    <Dropdown2
                      placeholder='원하는 장소 태그를 선택하세요'
                      options={locationList}
                      name='location'
                      onChange={handleChange}
                      value={values.location}
                    />
                  </div>
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>
                    감정 태그 추가{' '}
                    <span className='text-[12px] text-gray-500'>(최대 3개 선택 가능)</span>
                  </label>
                  <div ref={dropdownRef} onClick={scrollTo}>
                    <Dropdown2
                      value={values.emotion}
                      placeholder='원하는 감정 태그를 선택하세요'
                      options={emotionList}
                      name='emotion'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button
                  type={'button'}
                  onClick={postWriteRequest}
                  label={'작성 완료'}
                  disabled={!isFilled}
                />
              </div>
            </form>
          </div>
        </div>
        <Footer selectedMenu='community' />
      </div>
    </div>
  )
}

export default WritePage
