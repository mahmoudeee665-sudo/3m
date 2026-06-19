import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function Process() {
  const lineRef = useRef(null)
  const [lineLength, setLineLength] = useState(0)
  const { t, lang } = useTranslation()
  const steps = t('process.steps').map((s, i) => ({ ...s, num: `0${i + 1}` }))

  useEffect(() => {
    if (lineRef.current) setLineLength(lineRef.current.getBBox().height)
  }, [])

  return (
    <section id="process" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('process.label')}</span>
          <h2 className="section-heading">{t('process.heading')}</h2>
        </motion.div>

        <div className="relative">
          <svg
            ref={lineRef}
            className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0"
            width="2" height="100%"
            style={{ overflow: 'visible' }}
          >
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 6" />
            <line x1="1" y1="0" x2="1" y2={lineLength} stroke="var(--accent-fire)" strokeWidth="2" strokeDasharray="8 6"
              style={{ transition: 'stroke-dashoffset 2s ease' }} />
          </svg>

          <div className="space-y-12 md:space-y-20">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-start gap-6 md:gap-0 md:flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2"
                    style={{ background: 'var(--accent-fire)', color: '#fff', boxShadow: '0 0 0 4px var(--bg-secondary)' }}
                  >
                    {s.num}
                  </div>
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-0' : 'md:text-left md:pl-0'}`}>
                    <h3 className="font-space font-semibold text-xl mb-2">{s.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
