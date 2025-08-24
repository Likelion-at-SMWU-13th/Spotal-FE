import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepSelector from '@/components/memory/StepSelector'
import useRecommend from '@/hooks/useRecommend'
import Loading from '@/components/shared/Loading'

const MemorySearchPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [emotion, setEmotion] = useState([])
  const [location, setLocation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { fetchRecommend2 } = useRecommend()

  const handleNext = async () => {
    if (step === 0) setStep(1)
    else {
      setIsLoading(true)
      const recommend = await fetchRecommend2(location, emotion)
      navigate('/recommended', {
        state: { placeData: recommend },
      })
    }
  }

  const handlePrev = () => {
    if (step === 0) navigate('/home')
    else setStep(step - 1)
  }

  const selected = step === 0 ? location : emotion
  const setSelected = step === 0 ? setLocation : setEmotion

  return (
    <>
      {isLoading && <Loading />}
      <StepSelector
        step={step}
        selected={selected}
        onSelect={setSelected}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}

export default MemorySearchPage
