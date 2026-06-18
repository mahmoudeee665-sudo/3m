import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import ThreeBackground from '../ui/ThreeBackground.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

function AnimatedGradientText({ children }) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)

  useEffect(() => {
    if ('ontouchstart' in window) return
    function move(e) { setX((e.clientX / window.innerWidth) * 100); setY((e.clientY / window.innerHeight) * 100) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: `radial-gradient(circle at ${x}% ${y}%, var(--accent-electric), var(--accent-neon), var(--accent-fire))`,
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </span>
  )
}

function Typewriter({ words }) {
  const [wi, setWi] = useState(0)
  const [d, setD] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = words[wi]
    let t
    if (!del) {
      if (d.length < cur.length) t = setTimeout(() => setD(cur.slice(0, d.length + 1)), 60)
      else t = setTimeout(() => setDel(true), 2000)
    } else {
      if (d.length > 0) t = setTimeout(() => setD(d.slice(0, -1)), 30)
      else { setDel(false); setWi((wi + 1) % words.length) }
    }
    return () => clearTimeout(t)
  }, [d, del, wi])

  return (
    <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-space font-semibold" style={{ color: 'var(--text-secondary)' }}>
      <span>{d}</span>
      <span className="inline-block w-[2px] h-[1em] rounded-full animate-pulse" style={{ background: 'var(--accent-electric)', boxShadow: '0 0 6px var(--accent-electric)' }} />
    </span>
  )
}

export default function Hero() {
  const { t, lang } = useTranslation()
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])

  return (
    <section id="hero" className="relative min-h-[65vh] md:min-h-screen flex flex-col overflow-x-hidden pt-16 md:pt-0">
      <ThreeBackground />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 opacity-20 dark:opacity-15" style={{
          background: 'radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--accent-electric) 25%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, color-mix(in srgb, var(--accent-neon) 15%, transparent) 0%, transparent 40%)',
        }} />
        <div className="absolute top-1/4 -left-20 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent-electric)' }} />
        <div className="absolute bottom-1/4 -right-20 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent-neon)' }} />
      </motion.div>

      <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-24">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4 sm:mb-6"
                style={{
                  background: 'color-mix(in srgb, var(--accent-electric) 8%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--accent-electric) 20%, transparent)',
                  color: 'var(--accent-electric)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-neon)]" />
                {t('hero.label')}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-space font-bold text-[clamp(1.5rem,5.5vw,3.75rem)] leading-[1.15] mb-2 sm:mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('hero.line1')}<br className="hidden sm:block" />
                {t('hero.line2')} <AnimatedGradientText>{t('hero.line3')}</AnimatedGradientText>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 mb-4 sm:mb-5 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('hero.tagline')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-3 sm:mb-6"
              >
                <Typewriter words={t('hero.words')} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-3"
              >
                <Button variant="gradient" size="md" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group w-full sm:w-auto">
                  {lang === 'en' ? 'See Our Work' : 'شاهد أعمالنا'}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-medium underline underline-offset-4 transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-muted)' }}>
                  {lang === 'en' ? 'Get a free quote' : 'احصل على عرض سعر'}
                  <ArrowRight size={12} />
                </button>
              </motion.div>
            </div>

            {/* Right: Decorative desktop only */}
            <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-right"
              >
                <div className="rounded-2xl p-5 border min-w-[200px]"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="text-[10px] font-semibold tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'en' ? 'TRUSTED BY' : 'موثوق من'}
                  </div>
                  <div className="flex flex-col gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-electric)' }} />
                      {lang === 'en' ? '50+ Delivered Projects' : 'أكثر من ٥٠ مشروعاً'}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-neon)' }} />
                      {lang === 'en' ? '98% Client Satisfaction' : '٩٨٪ رضا العملاء'}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-fire)' }} />
                      {lang === 'en' ? '12 Countries Served' : '١٢ دولة'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="relative z-10 px-5 sm:px-8 lg:px-12 pb-3 sm:pb-5"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--accent-electric)] font-bold tabular-nums">50+</span>
              <span className="inline">{lang === 'en' ? 'Projects' : 'مشروع'}</span>
            </span>
            <span className="w-px h-3" style={{ background: 'var(--border)' }} />
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--accent-neon)] font-bold tabular-nums">98%</span>
              <span className="inline">{lang === 'en' ? 'Satisfaction' : 'رضا'}</span>
            </span>
            <span className="w-px h-3" style={{ background: 'var(--border)' }} />
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--accent-fire)] font-bold tabular-nums">12</span>
              <span className="inline">{lang === 'en' ? 'Countries' : 'دولة'}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1">
              <i className="fas fa-star text-xs" style={{ color: '#F59E0B' }} />
              <i className="fas fa-star text-xs" style={{ color: '#F59E0B' }} />
              <i className="fas fa-star text-xs" style={{ color: '#F59E0B' }} />
              <i className="fas fa-star text-xs" style={{ color: '#F59E0B' }} />
              <i className="fas fa-star text-xs" style={{ color: '#F59E0B' }} />
            </span>
            <span>5.0</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
      >
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <ArrowDown size={14} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
