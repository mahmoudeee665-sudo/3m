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
    ring.style.transform = `translate(${mx - 15}px, ${my - 15}px)`

    function move(e) {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    function anim() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`
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
        className="custom-cursor-dot"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--accent-electric)',
          boxShadow: '0 0 8px var(--accent-electric)',
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-100px, -100px)',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1.5px solid var(--accent-electric)',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  )
}
