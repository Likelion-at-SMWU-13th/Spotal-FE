import { useEffect, useState } from 'react'

const SearchResults = ({ keyword, goToMap }) => {
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([])
      return
    }

    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const filtered = data.filter(
          (place) =>
            place.address_name.includes('용산구') || place.road_address_name?.includes('용산구'),
        )
        setResults(filtered)
      } else {
        setResults([])
      }
    })
  }, [keyword])

  if (results.length === 0) return null

  return (
    <div className='absolute top-[33vh] w-[85%] max-w-[500px] p-3 pt-2 pb-1 border-2 border-primary rounded-[20px] bg-white shadow-md z-100 overflow-y-auto max-h-[55vh] scrollbar-hide'>
      <ul>
        {results.map((place) => (
          <li
            key={place.id}
            className='cursor-pointer border-b-2 border-primary last:border-0 p-2 hover:bg-gray-100'
            onClick={() => goToMap(place.place_name)}
          >
            <p className='font-medium text-l'>{place.place_name}</p>
            <p className='text-xs text-gray-500'>{place.address_name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
