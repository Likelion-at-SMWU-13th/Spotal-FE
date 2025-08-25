import { useState, useRef } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import Marker from './Marker'
import InfoContainer from './InfoContainer'
import Loading from '../shared/Loading'
import useLoadPolyline from '@/hooks/useLoadPolyline'
import Marker2 from '@/assets/Marker2.svg'

const KakaoMap = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isOpenMarker, setIsOpenMarker] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const mapRef = useRef(null)

  const yOffsetByLevel = {
    1: 0.0003125,
    2: 0.000625,
    3: 0.00125,
    4: 0.0025,
    5: 0.005,
    6: 0.01,
    7: 0.02,
    8: 0.04,
    9: 0.08,
    10: 0.16,
    11: 0.32,
    12: 0.64,
  }

  const linePath =
    (markers.length && markers[0].status === '이전함') || markers[0].previous_lng != null
      ? useLoadPolyline({
          origin: `${markers[0].lng},${markers[0].lat}`,
          destination: `${markers[0].previous_lng},${markers[0].previous_lat}`,
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
        const level = mapRef.current.getLevel()
        const offset = yOffsetByLevel[level] || 0
        const moveLatLng = new window.kakao.maps.LatLng(marker.lat - offset, marker.lng)
        mapRef.current.panTo(moveLatLng)
      }
    }
  }

  const handleMapClick = () => {
    setIsOpenMarker(false)
  }

  const handleLoading = () => {
    setIsLoading(true)
  }

  return (
    <div>
      {isLoading && <Loading />}
      <Map
        onClick={handleMapClick}
        center={{ lat: markers[0].lat, lng: markers[0].lng }}
        level={5}
        style={{ maxWidth: '768px', width: '100vw', height: '100vh' }}
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
            category={marker.category}
            onClick={handleMarkerClick}
          />
        ))}
        {linePath.length > 0 && (
          <>
            <MapMarker
              position={{ lat: markers[0].previous_lat, lng: markers[0].previous_lng }}
              image={{
                src: Marker2,
                size: { width: 50, height: 50 },
              }}
            ></MapMarker>
            <Polyline
              path={linePath}
              strokeWeight={5}
              strokeColor='#ff6200'
              strokeOpacity={0.8}
              strokeStyle='solid'
            />
          </>
        )}
        {isOpenMarker && (
          <InfoContainer
            placeName={selectedMarker.placeName}
            status={selectedMarker.state}
            address={selectedMarker.address}
            summary={selectedMarker.summary}
            tags={selectedMarker.emotion}
            category={selectedMarker.category}
            load={handleLoading}
          />
        )}
      </Map>
    </div>
  )
}

export default KakaoMap
