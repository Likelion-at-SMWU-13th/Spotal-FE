import { useEffect, useState } from 'react'
import useLoadSearch from './useLoadSearch'

const useLoadPolyline = ({ origin, destination }) => {
  const { fetchLoad } = useLoadSearch()
  const [linePath, setLinePath] = useState([])
  useEffect(() => {
    const loadRoute = async () => {
      const route = await fetchLoad({
        origin: origin,
        destination: destination,
      })

      if (!route) return

      const path = []
      route.routes[0].sections[0].roads.forEach((road) => {
        const { vertexes } = road
        for (let i = 0; i < vertexes.length; i += 2) {
          path.push({ lat: vertexes[i + 1], lng: vertexes[i] })
        }
      })
      setLinePath(path)
    }

    loadRoute()
  }, [])
  return linePath
}

export default useLoadPolyline
