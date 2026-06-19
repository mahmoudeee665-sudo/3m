import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const projects = [
  { name: 'Rent Go', url: 'https://rent-go.ae/', light: '/projects/rent_and_go_light.webp', dark: '/projects/rent_and_go_dark.webp', alt: 'Rent Go car rental booking platform homepage', tag: 'Web App' },
  { name: 'Watan Alex', url: 'https://watan-alex.netlify.app/', light: '/projects/watan_alex_light.webp', dark: '/projects/watan_alex_dark.webp', alt: 'Watan Alex real estate property listings website', tag: 'Web App' },
  { name: 'Royal CCR', url: 'https://royal-ccrs.vercel.app/', light: '/projects/royal_ccr.webp', dark: '/projects/royal_ccr.webp', alt: 'Royal CCR construction and contracting services site', tag: 'Web App' },
  { name: 'Egyfield', url: 'https://egyfield.com/', light: '/projects/egyfield_light.webp', dark: '/projects/egyfield_dark.webp', alt: 'Egyfield oil and gas industry services website', tag: 'Web App' },
]

export default function ProjectsPage() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const isRTL = lang === 'ar'

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('projects.label')}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{t('projects.heading')}</h1>
          <p className="section-body mx-auto">{t('projects.desc')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group block rounded-3xl overflow-hidden relative"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                textDecoration: 'none',
                aspectRatio: '16 / 11',
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <img
                src={dark ? p.dark : p.light}
                alt={p.alt}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-fire)' }}>
                    {p.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{p.name}</h3>
                </div>
                <ExternalLink size={20} className="text-white/70 group-hover:text-white transition-colors shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
