import { useEffect, useState } from 'react'
import Header from '@/components/shared/Header.jsx'
import Footer from '@/components/shared/Footer.jsx'
import Dropdown2 from '@/components/community/Dropdown2.jsx'
import { emotionList, locationList } from '@/components/community/Dropdown.jsx'
import Button from '@/components/shared/Button.jsx'
import ImageUploader from '@/components/community/ImageUploader.jsx'
import { useFormFilled } from '@/hooks/useFormFilled'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from './Signup'

const EditPage = () => {
  const labelClass = 'font-[Medium] text-[1rem]'
  const divClass = 'flex flex-col gap-[1.54vh]'
  const [data, setData] = useState(null)
  const { memory_id } = useParams()
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const navigate = useNavigate()

  const { values, handleChange, isFilled, setValues } = useFormFilled({
    text: '',
    location: null,
    emotion: [],
  })

  const getDetail = (memory_id) => {
    axios
      .get(`${baseURL}/community/memories/${memory_id}/`)
      .then((res) => {
        console.log('데이터', res.data.data)
        setData(res.data.data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getDetail(memory_id)
  }, [memory_id])

  useEffect(() => {
    if (!data) return

    const toIdArrayByKey = (v, key) => {
      if (Array.isArray(v)) {
        return v
          .map((x) => (x && typeof x === 'object' ? Number(x[key]) : Number(x)))
          .filter((n) => !Number.isNaN(n))
      }
      if (v == null || v === '') return []
      if (typeof v === 'object') {
        const n = Number(v[key])
        return Number.isNaN(n) ? [] : [n]
      }
      const n = Number(v)
      return Number.isNaN(n) ? [] : [n]
    }

    const nextValues = {
      text: data?.content ?? '',
      emotion: toIdArrayByKey(data?.emotions, 'emotion_id'),
      location: data?.location?.location_id ?? null,
    }
    setValues(nextValues)
    setImages(Array.isArray(data?.images) ? data.images : [])
  }, [data, setValues])

  const patchEditRequest = () => {
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
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
    axios
      .patch(`${baseURL}/community/memories/${memory_id}/`, formData)
      .then((res) => {
        console.log(res)
        navigate('/post')
      })
      .catch((err) => {
        console.log('status', err.response?.status)
        console.log('body', err.response?.data)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full max-w-[768px] bg-white min-h-screen'>
        <Header label={'글 수정하기'} />
        <div className='bg-white flex justify-center pb-[13vh]'>
          <div className='w-[80%] mt-[13.98vh] bg-primary-300 rounded-[10px]'>
            <form className='flex flex-col justify-center align-middle'>
              <div className='flex flex-col gap-[2.3vh] self-center py-10 mx-5'>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>이미지 추가</label>
                  <ImageUploader
                    urllist={images}
                    onFilesChange={setFiles}
                    onRemove={(id) => {
                      console.log(id)
                      axios.delete(`${baseURL}/community/images/${id}/`).then((res) => {
                        setImages((prev) => prev.filter((img) => img.image_id !== id))
                      })
                    }}
                  />
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>내용 수정</label>
                  <textarea
                    className='w-[71.794vw] max-w-[36rem] md:w-[36rem] h-[9.834vh] bg-[#ffffff] focus:outline-none focus:border-primary rounded-[9px] resize-none border-[0.9px] border-grey-200 py-[0.9vh] px-[1.64vw]'
                    placeholder='작성할 내용을 입력하세요'
                    name='text'
                    value={values.text}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>장소 태그 추가</label>
                  <Dropdown2
                    placeholder='원하는 장소 태그를 선택하세요'
                    options={locationList}
                    name='location'
                    onChange={handleChange}
                    value={values.location}
                  />
                </div>
                <div className={`${divClass}`}>
                  <label className={`${labelClass}`}>감정 태그 추가</label>
                  <Dropdown2
                    placeholder='원하는 감정 태그를 선택하세요'
                    options={emotionList}
                    name='emotion'
                    onChange={handleChange}
                    value={values.emotion}
                  />
                </div>
                <Button
                  type={'button'}
                  label={'작성 완료'}
                  disabled={!isFilled}
                  onClick={patchEditRequest}
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

export default EditPage
