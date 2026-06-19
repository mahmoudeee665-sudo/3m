import { useEffect, useRef } from 'react'

export default function useLockedBody(locked) {
  const originalRef = useRef(null)

  useEffect(() => {
    if (locked) {
      originalRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'
    } else {
      document.body.style.overflow = originalRef.current || ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = originalRef.current || ''
      document.body.style.paddingRight = ''
    }
  }, [locked])
}
