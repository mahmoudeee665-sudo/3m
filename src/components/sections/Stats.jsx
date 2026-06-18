import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp.js'
import { useTranslation } from '../../context/LanguageContext.jsx'

const stats = [
  { value: 50, suffix: '+' },
  { value: 12, suffix: '' },
  { value: 98, suffix: '%' },
  { value: 3, suffix: 'x', prefix: '' },
]

function StatCard({ value, suffix, label, prefix = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const count = useCountUp(value, 2000, inView)

  return (
    <div ref={ref} className="text-center">
      <div className="font-space font-bold text-4xl md:text-5xl" style={{ color: 'var(--accent-electric)' }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  )
}

export default function Stats() {
  const { t } = useTranslation()
  const labels = t('stats.labels')

  return (
    <section className="py-20 px-6" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">{t('stats.heading')}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className={`relative ${i < stats.length - 1 ? 'md:after:absolute md:after:right-0 md:after:top-1/4 md:after:h-1/2 md:after:w-px md:after:bg-[var(--border)]' : ''}`}>
              <StatCard {...s} label={labels[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
