import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '@/pages/Signup'

const usePlaceSearch = () => {
  const [marker, setMarker] = useState([])
  const [status, setStatus] = useState('idle')
  const current = { lat: 37.547, lng: 126.964 }

  const fetchMarker = async (keyword) => {
    if (!keyword.trim()) return { marker: [], status: 'idle' }

    setStatus('loading')

    try {
      const res = await axios.get(`${baseURL}/search/store/`, {
        params: { q: keyword, lat: current.lat, lng: current.lng },
      })
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
            category: res.data.store.uptaenm,
            previous_lat: res.data.store.previous_lat,
            previous_lng: res.data.store.previous_lng,
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
