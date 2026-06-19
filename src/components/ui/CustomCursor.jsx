import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    dot.style.transform = `translate(${mx}px, ${my}px)`
    ring.style.transform = `translate(${mx - 14}px, ${my - 14}px)`

    function move(e) {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    function anim() {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`
      requestAnimationFrame(anim)
    }

    window.addEventListener('mousemove', move)
    const raf = requestAnimationFrame(anim)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#a855f7',
          boxShadow: '0 0 6px rgba(168,85,247,0.4)',
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-100px, -100px)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(168,85,247,0.25)',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  )
}