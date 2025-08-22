import { useState, useEffect, useCallback } from 'react'

export function useFormFilled(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [isFilled, setIsFilled] = useState(false)

  const handleChange = useCallback((val) => {
    if (typeof val === 'object' && val !== null && 'name' in val && 'ids' in val) {
      const { name, ids } = val
      setValues((prev) => ({
        ...prev,
        [name]: ids,
      }))
      return
    }

    const next = val
    const { name, value } = next?.target || {}
    if (name == null) return
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  useEffect(() => {
    const filled = Object.values(values).every((val) => {
      if (typeof val === 'string') return val.trim() !== ''
      if (Array.isArray(val)) return val.length > 0
      if (typeof val === 'number') return !Number.isNaN(val)
      return val != null
    })
    setIsFilled(filled)
  }, [values])

  return { values, setValues, handleChange, isFilled }
}
