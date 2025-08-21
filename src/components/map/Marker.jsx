import { MapMarker } from 'react-kakao-maps-sdk'
import Marker1 from '@/assets/Marker1.svg'
import Marker2 from '@/assets/Marker2.svg'

const Marker = ({ position, placeName, address, state, summary, emotion, onClick }) => {
  const markerSrc = state === '운영중' ? Marker1 : Marker2

  return (
    <MapMarker
      position={position}
      onClick={() =>
        onClick({
          lat: position.lat,
          lng: position.lng,
          placeName,
          address,
          state,
          summary,
          emotion,
        })
      }
      image={{
        src: markerSrc,
        size: { width: 50, height: 50 },
      }}
    />
  )
}

export default Marker
