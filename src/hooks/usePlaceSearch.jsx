import { useState, useEffect } from 'react'
import axios from 'axios'
import useGelocation from './useGelocation'

const usePlaceSearch = () => {
  const [marker, setMarker] = useState([])
  const [status, setStatus] = useState('idle')
  const current = useGelocation()

  const fetchMarker = async (keyword) => {
    if (!keyword.trim()) return { marker: [], status: 'idle' }

    setStatus('loading')

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/search/store/`, {
        params: { q: keyword, lat: current.lat, lng: current.lng },
      })
      console.log(res.data)
      if (res.data && res.data.store) {
        const emotionNames = res.data.store.emotions?.map((e) => e.name) || []
        const newMarker = [
          {
            lat: res.data.latitude,
            lng: res.data.longitude,
            title: res.data.store.name,
            address: res.data.store.address,
            status: res.data.store.status,
            summary_card: res.data.summary_card,
            photos: res.data.photos,
            emotions: emotionNames,
          },
        ]
        setMarker(newMarker)
        setStatus('success')
        return { marker: newMarker, status: 'success' }
      } else {
        setMarker([])
        setStatus('noResults')
        return { marker: [], status: 'noResults' }
      }
    } catch {
      setMarker([])
      setStatus('noResults')
      return { marker: [], status: 'noResults' }
    }
  }

  return { fetchMarker, status }
}

export default usePlaceSearch
