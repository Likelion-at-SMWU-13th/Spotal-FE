import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '@/pages/Signup'

const useRecommend = () => {
  const [state, setStatus] = useState('idle')

  const fetchRecommend = async (keyword, address, emotion, id) => {
    setStatus('loading')

    try {
      const res = await axios.post(
        `${baseURL}/api/places/`,
        {
          name: keyword,
          address: address,
          emotion_tags: emotion,
          user_id: id,
        },

        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setStatus('success')
      return res.data
    } catch (err) {
      setStatus('noResults')
      console.error('등록 실패:', err.response?.data || err.message)
    }
  }

  const fetchRecommend2 = async (location, emotion, id) => {
    setStatus('loading')

    try {
      const res = await axios.post(
        `${baseURL}/api/infer/create-session/`,
        {
          selected_location: location,
          selected_emotions: emotion,
          user_id: id,
        },

        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setStatus('success')
      return res.data
    } catch (err) {
      setStatus('noResults')
      console.error('등록 실패:', err.response?.data || err.message)
    }
  }

  return { fetchRecommend, fetchRecommend2, state }
}

export default useRecommend
