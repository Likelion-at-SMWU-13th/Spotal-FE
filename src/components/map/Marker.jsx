import { MapMarker } from 'react-kakao-maps-sdk'
import Marker1 from '@/assets/Marker1.svg'
import Marker2 from '@/assets/Marker2.svg'

const Marker = ({
  position,
  placeName,
  address,
  state,
  summary,
  emotion,
  category = null,
  onClick,
}) => {
  const markerSrc = state === '폐업함' ? Marker2 : Marker1
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
          category,
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
