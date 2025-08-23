import React from 'react'
import KakaoMap from './KakaoMap'

const MapContainer = ({ markers }) => {
  return (
    <div className='flex justify-center'>
      <KakaoMap markers={markers} />
    </div>
  )
}

export default MapContainer
