import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import LangToggle from '../ui/LangToggle.jsx'
import Button from '../ui/Button.jsx'
import useScrollSpy from '../../hooks/useScrollSpy.js'
import { useTranslation } from '../../context/LanguageContext.jsx'

const sectionIds = ['hero', 'services', 'work', 'process', 'stats', 'testimonials', 'tech', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(sectionIds, 120)
  const { t, lang } = useTranslation()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function scrollTo(id) {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { id: 'work', label: t('nav.work') },
    { id: 'services', label: t('nav.services') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-[var(--bg-primary)]/70 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="text-xl font-bold font-space cursor-pointer bg-transparent border-none">
            <span style={{ color: 'var(--text-primary)' }}>triple </span>
            <span style={{ color: 'var(--accent-electric)' }}>m</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`bg-transparent border-none cursor-pointer text-sm font-medium transition-colors duration-200 ${
                  active === l.id ? 'text-[var(--accent-electric)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LangToggle />
            <Button size="sm" onClick={() => scrollTo('contact')}>
              {t('nav.letsBuild')} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden bg-transparent border-none cursor-pointer p-2"
            aria-label="Open menu"
          >
            <Menu size={24} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6">
              <span className="text-xl font-bold font-space">
              <span style={{ color: 'var(--text-primary)' }}>triple </span>
              <span style={{ color: 'var(--accent-electric)' }}>m</span>
              </span>
              <button onClick={() => setOpen(false)} className="bg-transparent border-none cursor-pointer p-2" aria-label="Close menu">
                <X size={24} style={{ color: 'var(--text-primary)' }} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(l.id)}
                  className="bg-transparent border-none cursor-pointer text-3xl font-space font-bold transition-colors hover:text-[var(--accent-electric)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <ThemeToggle />
                <LangToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
