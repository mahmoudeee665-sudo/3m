import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, X, Check } from 'lucide-react'

export default function ProjectModal({ project, onClose, lang, isRTL, dark }) {
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto py-4 px-2 sm:px-4"
      style={{ background: 'rgba(8, 11, 20, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', overscrollBehavior: 'contain' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl mx-auto"
        style={{ background: 'var(--bg-primary)', borderRadius: 16, border: '1px solid var(--border)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:scale-110 hover:brightness-125"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(10px)' }}
        >
          <X size={13} />
        </button>

        <div className="relative h-28 sm:h-32 md:h-44 overflow-hidden rounded-t-[16px]">
          <img
            src={dark ? project.dark : project.light}
            alt={project.alt}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-widest px-2 py-0.5 md:px-3 md:py-1 rounded-full" style={{ background: 'var(--accent-fire)', color: '#fff' }}>
              {project.tag}
            </span>
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mt-1.5 md:mt-3" style={{ color: 'var(--text-primary)' }}>{project.name}</h2>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
            <div>
              <h4 className="text-[10px] md:text-xs font-semibold tracking-widest mb-1.5 md:mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span className="w-0.5 h-3 rounded-full" style={{ background: 'var(--accent-fire)' }} />
                {lang === 'en' ? 'What We Did' : 'ما قمنا به'}
              </h4>
              <div className="flex flex-col gap-1.5">
                {project.whatWeDid.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                    <Check size={10} className="shrink-0" style={{ color: 'var(--accent-fire)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] md:text-xs font-semibold tracking-widest mb-1.5 md:mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span className="w-0.5 h-3 rounded-full" style={{ background: 'var(--accent-fire)' }} />
                {lang === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
              </h4>
              <ul className="flex flex-col gap-1.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-fire)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <h4 className="text-[10px] md:text-xs font-semibold tracking-widest mb-1.5 md:mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <span className="w-0.5 h-3 rounded-full" style={{ background: 'var(--accent-fire)' }} />
              {lang === 'en' ? 'Technologies' : 'التقنيات'}
            </h4>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="text-[10px] sm:text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1.5 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                  style={{ background: `color-mix(in srgb, var(--accent-fire) 12%, transparent)`, color: 'var(--accent-fire)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-xl border-none cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 w-full sm:w-auto"
            style={{ background: 'var(--accent-fire)', color: '#FFF7E9' }}
          >
            <ExternalLink size={14} />
            {lang === 'en' ? 'Visit Website' : 'زيارة الموقع'}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
