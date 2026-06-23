import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './Projects.css'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import Button from '../ui/Button.jsx'
import ProjectModal from '../ui/ProjectModal.jsx'

const projects = [
  {
    name: 'Rent Go',
    url: 'https://rent-go.ae/',
    light: '/projects/rent_and_go_light.webp',
    dark: '/projects/rent_and_go_dark.webp',
    alt: 'Rent Go car rental booking platform homepage',
    tag: 'Web App',
    description: 'A full-featured car rental booking platform with real-time availability, fleet management, and online payments.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Booking Engine', 'Payment Integration', 'Admin Dashboard'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Node.js'],
    features: ['Real-time car availability', 'Online booking with payment', 'Fleet management dashboard', 'Multi-language support'],
  },
  {
    name: 'Watan Alex',
    url: 'https://watan-alex.netlify.app/',
    light: '/projects/watan_alex_light.webp',
    dark: '/projects/watan_alex_dark.webp',
    alt: 'Watan Alex real estate property listings website',
    tag: 'Web App',
    description: 'A modern real estate platform showcasing property listings with advanced search, virtual tours, and agent profiles.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Property CMS', 'Map Integration', 'SEO Optimization'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Mapbox', 'Sanity CMS'],
    features: ['Advanced property search', 'Interactive maps', 'Virtual tour support', 'Agent management system'],
  },
  {
    name: 'Royal CCR',
    url: 'https://royal-ccrs.vercel.app/',
    light: '/projects/royal_ccr.webp',
    dark: '/projects/royal_ccr.webp',
    alt: 'Royal CCR construction and contracting services site',
    tag: 'Web App',
    description: 'A professional corporate website for a construction and contracting company showcasing their portfolio and services.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Portfolio Showcase', 'Contact System', 'Performance Optimization'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    features: ['Project portfolio gallery', 'Service showcase', 'Contact inquiry form', 'Fast loading performance'],
  },
  {
    name: 'Egyfield',
    url: 'https://egyfield.com/',
    light: '/projects/egyfield_light.webp',
    dark: '/projects/egyfield_dark.webp',
    alt: 'Egyfield oil and gas industry services website',
    tag: 'Web App',
    description: 'A B2B corporate website for an oil and gas services company, featuring their expertise, projects, and industry insights.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Corporate CMS', 'Blog/News System', 'Multilingual Support'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'i18n'],
    features: ['Corporate brand identity', 'News and insights blog', 'Project case studies', 'Arabic & English support'],
  },
]

const slides = [...projects, ...projects, ...projects]

const autoplayPlugin = Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })

export default function Projects() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const isRTL = lang === 'ar'
  const apiRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25, direction: isRTL ? 'rtl' : 'ltr' },
    [autoplayPlugin]
  )

  useEffect(() => {
    apiRef.current = emblaApi
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [dark, emblaApi])

  return (
    <section id="work" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <span className="section-label">{t('projects.label')}</span>
          <h2 className="section-heading">{t('projects.heading')}</h2>
          <p className="section-body mx-auto">{t('projects.desc')}</p>
        </motion.div>

        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={() => apiRef.current?.scrollPrev()} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((p, i) => (
                <div key={i} className="embla__slide" role="group" aria-label={p.alt}>
                  <div
                    className="portfolio-card"
                    style={{
                      backgroundImage: `url(${dark ? p.dark : p.light})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <div className="portfolio-card-overlay" />
                    <span className="card-btn-wrap">
                      <button onClick={() => setSelected(p)} className="card-btn">{p.name}</button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={() => apiRef.current?.scrollNext()} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="text-center mt-10">
          <Button
            variant="gradient"
            size="md"
            onClick={() => navigate('/projects')}
            className="group"
          >
            {t('projects.viewAll')}
            {isRTL ? <ArrowLeft size={16} className="mr-2" /> : <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} lang={lang} isRTL={isRTL} dark={dark} />
        )}
      </AnimatePresence>
    </section>
  )
}
