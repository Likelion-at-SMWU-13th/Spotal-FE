import { useState, useEffect, useCallback } from 'react'

export function useFormFilled(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [isFilled, setIsFilled] = useState(false)

  const handleChange = useCallback((arg1, arg2) => {
    if (typeof arg1 === 'string') {
      const name = arg1
      const value = arg2
      setValues((prev) => ({ ...prev, [name]: value }))
      return
    }
    const e = arg1
    const { name, value } = e?.target || {}
    if (name == null) return
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  useEffect(() => {
    const filled = Object.values(values).every((val) => {
      if (typeof val === 'string') return val.trim() !== ''
      else if (Array.isArray(val)) return val.length > 0
    })
    setIsFilled(filled)
  }, [values])

  return { values, setValues, handleChange, isFilled }
}
