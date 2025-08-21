import { useState, useRef } from 'react'
import { Map, Polyline } from 'react-kakao-maps-sdk'
import Marker from './Marker'
import InfoContainer from './InfoContainer'
import useLoadPolyline from '@/hooks/useLoadPolyline'

const KakaoMap = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isOpenMarker, setIsOpenMarker] = useState(false)
  const mapRef = useRef(null)

  const linePath =
    markers.length && markers[0].status === '이전함'
      ? useLoadPolyline({
          origin: `${markers[0].lng},${markers[0].lat}`,
          destination: '127.033,37.501',
        })
      : []

  const handleMarkerClick = (marker) => {
    if (selectedMarker && selectedMarker.placeName === marker.placeName) {
      setIsOpenMarker(false)
      setSelectedMarker(null)
    } else {
      setSelectedMarker(marker)
      setIsOpenMarker(true)
      if (mapRef.current) {
        const moveLatLng = new window.kakao.maps.LatLng(marker.lat - 0.005, marker.lng)
        mapRef.current.panTo(moveLatLng)
      }
    }
  }

  const handleMapClick = () => {
    setIsOpenMarker(false)
  }

  return (
    <Map
      onClick={handleMapClick}
      center={{ lat: markers[0].lat, lng: markers[0].lng }}
      level={5}
      style={{ width: '100vw', height: '100vh' }}
      onCreate={(map) => (mapRef.current = map)}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.title}
          position={{ lat: marker.lat, lng: marker.lng }}
          placeName={marker.title}
          address={marker.address}
          state={marker.status}
          summary={marker.summary_card}
          emotion={marker.emotions}
          onClick={handleMarkerClick}
        />
      ))}
      {linePath.length > 0 && (
        <Polyline
          path={linePath}
          strokeWeight={5}
          strokeColor='#ff6200'
          strokeOpacity={0.8}
          strokeStyle='solid'
        />
      )}
      {isOpenMarker && (
        <InfoContainer
          placeName={selectedMarker.placeName}
          status={selectedMarker.state}
          address={selectedMarker.address}
          summary={selectedMarker.summary}
          tags={selectedMarker.emotion}
        />
      )}
    </Map>
  )
}

export default KakaoMap
