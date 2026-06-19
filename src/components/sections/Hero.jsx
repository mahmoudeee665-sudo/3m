import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, Zap, Globe, Code2, Smartphone, ShoppingBag, Palette, ShoppingCart } from 'lucide-react'
import Button from '../ui/Button.jsx'
import ThreeBackground from '../ui/ThreeBackground.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

/* ─── Animated Gradient Heading ─── */
function AnimatedGradientText({ children }) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)

  useEffect(() => {
    if ('ontouchstart' in window) return
    function move(e) {
      setX((e.clientX / window.innerWidth) * 100)
      setY((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <span
      className="hero-gradient-text"
      style={{
        backgroundImage: `radial-gradient(circle at ${x}% ${y}%, #d96b4a, var(--accent-fire))`,
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </span>
  )
}

/* ─── Typewriter ─── */
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
    <span className="hero-typewriter">
      <span className="hero-typewriter-text">{d}</span>
      <span className="hero-typewriter-cursor" />
    </span>
  )
}

/* ─── Floating Service Pill ─── */
function ServicePill({ icon: Icon, label, delay, color }) {
  return (
    <motion.div
      className="hero-service-pill"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="hero-service-pill-icon" style={{ color }}>
        <Icon size={14} />
      </span>
      <span>{label}</span>
    </motion.div>
  )
}

/* ─── Service Badge ─── */
function OrbitalVisual() {
  return (
    <div className="hero-orbital">
      {/* Central glowing orb */}
      <div className="hero-orbital-core">
        <div className="hero-orbital-core-inner">
          <Code2 size={28} strokeWidth={1.5} />
        </div>
      </div>
      {/* Orbiting rings */}
      <div className="hero-orbital-ring hero-orbital-ring-1">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <Globe size={14} />
        </div>
      </div>
      <div className="hero-orbital-ring hero-orbital-ring-2">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <Smartphone size={14} />
        </div>
      </div>
      <div className="hero-orbital-ring hero-orbital-ring-3">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <ShoppingBag size={14} />
        </div>
      </div>
      {/* Ambient glow */}
      <div className="hero-orbital-glow" />
    </div>
  )
}

const badgeIcons = {
  globe: Globe,
  'mobile-alt': Smartphone,
  palette: Palette,
}

/* ─── Service Badge ─── */
function ServiceBadge({ icon, label, delay }) {
  const IconComp = badgeIcons[icon]
  return (
    <motion.div
      className="hero-stat-card"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="hero-stat-value" style={{ color: 'var(--accent-fire)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16 }}>
        {IconComp && <IconComp size={14} />}
      </span>
      <span className="hero-stat-label" style={{ fontSize: 10 }}>{label}</span>
    </motion.div>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const { t, lang } = useTranslation()
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])
  const isRTL = lang === 'ar'

  const serviceItems = [
    { icon: Globe, label: lang === 'en' ? 'Web Apps' : 'تطبيقات ويب', color: 'var(--accent-fire)' },
    { icon: Smartphone, label: lang === 'en' ? 'Mobile' : 'جوال', color: 'var(--accent-fire)' },
    { icon: ShoppingBag, label: lang === 'en' ? 'E-Commerce' : 'تجارة إلكترونية', color: 'var(--accent-fire)' },
    { icon: Zap, label: lang === 'en' ? 'SaaS' : 'SaaS', color: 'var(--accent-fire)' },
  ]

  return (
    <section id="hero" className="hero-section">
      <ThreeBackground />

      {/* Parallax gradient overlays */}
      <motion.div className="hero-bg-effects" style={{ y: bgY }}>
        <div className="hero-bg-gradient" />
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />
        <div className="hero-bg-orb hero-bg-orb-3" />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="hero-noise" />

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-layout">

          {/* ─── Left: Text Content ─── */}
          <div className="hero-text-side">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hero-badge"
            >
              <span className="hero-badge-dot" />
              <Sparkles size={12} />
              <span>{t('hero.label')}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hero-heading"
            >
              <span className="hero-heading-line">{t('hero.line1')}</span>
              <span className="hero-heading-line">
                {t('hero.line2')}{' '}
                <AnimatedGradientText>{t('hero.line3')}</AnimatedGradientText>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="hero-tagline"
            >
              {t('hero.tagline')}
            </motion.p>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="hero-typewriter-wrap"
            >
              <span className="hero-typewriter-label">{lang === 'en' ? 'We build' : 'نبني'}</span>
              <Typewriter words={t('hero.words')} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="hero-cta-group"
            >
              <Button
                variant="gradient"
                size="md"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group hero-cta-primary"
              >
                {lang === 'en' ? 'See Our Work' : 'شاهد أعمالنا'}
                {isRTL ? <ArrowLeft size={16} className="hero-cta-arrow" /> : <ArrowRight size={16} className="hero-cta-arrow" />}
              </Button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-secondary"
              >
                {lang === 'en' ? 'Get a free quote' : 'احصل على عرض سعر'}
                {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
              </button>
            </motion.div>

            {/* Service Pills — mobile visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hero-services-row"
            >
              {serviceItems.map((s, i) => (
                <ServicePill key={i} icon={s.icon} label={s.label} color={s.color} delay={0.55 + i * 0.08} />
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Visual Side (Desktop) ─── */}
          <motion.div
            className="hero-visual-side"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Grid overlay */}
            <div className="hero-grid-overlay" />

            <OrbitalVisual />

            {/* Floating browser mockup */}
            <motion.div
              className="hero-mockup-browser"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-mockup-browser-bar">
                <span /><span /><span />
              </div>
              <div className="hero-mockup-browser-body">
                <div className="hero-mockup-line hero-mockup-line-short" />
                <div className="hero-mockup-line hero-mockup-line-long" />
                <div className="hero-mockup-line hero-mockup-line-medium" />
                <div className="hero-mockup-line hero-mockup-line-long" />
                <div className="hero-mockup-line hero-mockup-line-short" />
              </div>
            </motion.div>

            {/* Floating phone mockup */}
            <motion.div
              className="hero-mockup-phone"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-mockup-phone-notch" />
              <div className="hero-mockup-phone-screen">
                <div className="hero-mockup-phone-dot" />
                <div className="hero-mockup-phone-bar" />
                <div className="hero-mockup-phone-bar hero-mockup-phone-bar-short" />
              </div>
            </motion.div>

            {/* Floating stat cards */}
            <div className="hero-floating-stats">
              <ServiceBadge
                icon="globe"
                label={lang === 'en' ? 'Web Development' : 'تطوير الويب'}
                delay={0.6}
              />
              <ServiceBadge
                icon="mobile-alt"
                label={lang === 'en' ? 'Mobile Apps' : 'تطبيقات الجوال'}
                delay={0.7}
              />
              <ServiceBadge
                icon="palette"
                label={lang === 'en' ? 'UI/UX Design' : 'تصميم واجهات'}
                delay={0.8}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Stats Bar (Mobile) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hero-mobile-stats"
      >
        <div className="hero-mobile-stats-inner">
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Globe size={12} /> {lang === 'en' ? 'Web' : 'ويب'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Smartphone size={12} /> {lang === 'en' ? 'Mobile' : 'جوال'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Palette size={12} /> {lang === 'en' ? 'UI/UX' : 'تصميم'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <ShoppingCart size={12} /> {lang === 'en' ? 'Shopify' : 'متاجر'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="hero-scroll-mouse"
        >
          <div className="hero-scroll-dot" />
        </motion.div>
        <span className="hero-scroll-text">{lang === 'en' ? 'Scroll' : 'اسحب'}</span>
      </motion.div>
    </section>
  )
}
