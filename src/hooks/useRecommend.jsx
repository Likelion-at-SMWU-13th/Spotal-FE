import { useState, useEffect } from 'react'
import axios from 'axios'

const useRecommend = () => {
  const [state, setStatus] = useState('idle')

  const fetchRecommend = async (keyword, address, emotion) => {
    setStatus('loading')

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/places/`,
        {
          name: keyword,
          address: address,
          emotion_tags: emotion,
        },

        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setStatus('success')
      console.log(res.data)
      return res.data
    } catch (err) {
      setStatus('noResults')
      console.error('등록 실패:', err.response?.data || err.message)
    }
  }

  const fetchRecommend2 = async (location, emotion) => {
    setStatus('loading')

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/infer/create-session/`,
        {
          selected_location: location,
          selected_emotions: emotion,
        },

        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setStatus('success')
      console.log(res.data)
      return res.data
    } catch (err) {
      setStatus('noResults')
      console.error('등록 실패:', err.response?.data || err.message)
    }
  }

  return { fetchRecommend, fetchRecommend2, state }
}

export default useRecommend
