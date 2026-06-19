import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

export default function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const ready = useRef(false)

  const threeContainer = useRef(null)

  useEffect(() => {
    const container = threeContainer.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    function makeLayer(count, spread, color, size, opacity) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color, size, transparent: true, opacity,
        blending: THREE.AdditiveBlending, sizeAttenuation: true,
      })
      const points = new THREE.Points(geo, mat)
      scene.add(points)
      return points
    }

    const layer1 = makeLayer(320, 18, '#c34a36', 0.055, 0.6)
    const layer2 = makeLayer(180, 22, '#7C6FE8', 0.04, 0.4)

    function onResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let frame
    function animate() {
      frame = requestAnimationFrame(animate)
      layer1.rotation.y += 0.0006
      layer1.rotation.x += 0.0002
      layer2.rotation.y -= 0.0004
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    let mounted = true
    const minTime = 1500
    const start = Date.now()

    function checkReady() {
      if (!mounted) return
      const elapsed = Date.now() - start
      setProgress(Math.min(100, Math.round((elapsed / minTime) * 100)))
      if (ready.current && elapsed >= minTime) {
        setShow(false)
        setTimeout(onFinish, 600)
      }
    }

    Promise.all([
      new Promise(resolve => {
        if (document.readyState === 'complete') return resolve()
        window.addEventListener('load', resolve, { once: true })
      }),
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]).then(() => {
      ready.current = true
      checkReady()
    })

    const interval = setInterval(checkReady, 80)
    return () => { mounted = false; clearInterval(interval) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#0d0a15' }}
        >
          {/* Three.js particle field */}
          <div ref={threeContainer} className="absolute inset-0" style={{ zIndex: 0 }} />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-0" style={{ zIndex: 1 }}>
            {/* Big centered logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative mb-6"
            >
              <motion.div
                className="absolute -inset-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(195,74,54,0.15), transparent 70%)',
                  filter: 'blur(30px)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img src="/logos/Orange.svg" alt="triple m" className="w-28 h-28 md:w-36 md:h-36" />
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              {/* Tagline */}
              <motion.p
                className="text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Your Vision, Engineered
              </motion.p>

              {/* Thin progress bar */}
              <motion.div
                className="w-36 md:w-44"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent-electric), var(--accent-fire))' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              {/* Status */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: progress < 100 ? 'var(--accent-fire)' : '#4ade80' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-[10px] tracking-[0.15em] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {progress < 100 ? 'INITIALIZING' : 'CONNECTED'}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
