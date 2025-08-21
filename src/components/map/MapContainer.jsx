import React from 'react'
import KakaoMap from './KakaoMap'

const MapContainer = ({ markers }) => {
  return (
    <div>
      <KakaoMap markers={markers} />
    </div>
  )
}

export default MapContainer
