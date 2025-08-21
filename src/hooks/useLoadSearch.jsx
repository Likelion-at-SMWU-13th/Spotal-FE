import { useState, useEffect } from 'react'
import axios from 'axios'

const useLoadSearch = () => {
  const fetchLoad = async ({ origin, destination }) => {
    try {
      const res = await axios.get('https://apis-navi.kakaomobility.com/v1/directions', {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`,
        },
        params: {
          origin: origin,
          destination: destination,
          priority: 'RECOMMEND',
          car_fuel: 'GASOLINE',
          car_hipass: false,
        },
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  return { fetchLoad }
}

export default useLoadSearch
