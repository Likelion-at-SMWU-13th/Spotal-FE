import { useLocation } from 'react-router-dom'
import MapContainer from '@/components/map/MapContainer'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

const MapPage = () => {
  const location = useLocation()
  const { markers } = location.state || {}

  return (
    <div>
      <Header label={'검색 결과'}></Header>
      <MapContainer markers={markers} />
      <Footer></Footer>
    </div>
  )
}

export default MapPage
