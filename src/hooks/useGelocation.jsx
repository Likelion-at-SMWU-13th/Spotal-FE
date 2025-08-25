import { useState, useEffect } from 'react'

const STORAGE_KEY = 'current_location'

const useGeolocation = () => {
  const savedLocation = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')

  const [location, setLocation] = useState(
    savedLocation || {
      lat: 37.53609444,
      lng: 126.9675222,
    },
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저에서는 위치 정보가 지원되지 않습니다.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        setLocation(newLocation)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation))
      },
      (err) => {
        console.error('위치 정보 오류:', err)
      },
      {
        enableHighAccuracy: false,
        maximumAge: 5000,
        timeout: 600000,
      },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return location
}

export default useGeolocation
