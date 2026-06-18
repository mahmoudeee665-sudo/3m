import { useState, useEffect, useRef } from 'react'

export default function useScrollSpy(sectionIds, offset = 100) {
  const [active, setActive] = useState('')
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: `-${offset}px 0px -50% 0px` }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.current.observe(el)
    })

    return () => observer.current?.disconnect()
  }, [sectionIds, offset])

  return active
}
