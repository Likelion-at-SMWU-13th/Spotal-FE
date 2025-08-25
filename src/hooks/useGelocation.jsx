import { useState, useEffect } from 'react'

const useGelocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저에서는 위치 정보가 지원되지 않습니다.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {},
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])
  return location
}

export default useGelocation
