import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepSelector from '@/components/memory/StepSelector'

const MemorySearchPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [emotion, setEmotion] = useState([])
  const [location, setLocation] = useState([])

  const handleNext = () => {
    if (step === 0) setStep(1)
    else {
      console.log('최종 데이터:', { emotion, location })
      // navigate('/recommended')
    }
  }

  const handlePrev = () => {
    if (step === 0) navigate('/home')
    else setStep(step - 1)
  }

  const selected = step === 0 ? emotion : location
  const setSelected = step === 0 ? setEmotion : setLocation

  return (
    <StepSelector
      step={step}
      selected={selected}
      onSelect={setSelected}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  )
}

export default MemorySearchPage
