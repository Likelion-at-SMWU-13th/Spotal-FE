import { useEffect } from 'react'

export function useOutsideClick(ref, onClose, when = true) {
  useEffect(() => {
    if (!when) return
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) onClose?.(e)
    }

    document.addEventListener('pointerdown', onDown, true)
    return () => document.removeEventListener('pointerdown', onDown, true)
  }, [ref, onClose, when])
}

export default useOutsideClick
