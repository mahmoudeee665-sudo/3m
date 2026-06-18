import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Projects.css'
import { useTranslation } from '../../context/LanguageContext.jsx'

const projects = [
  { name: 'Rent Go', url: 'https://rent-go.ae/', img: '/screencapture-rent-go-ae-2026-06-17-21_34_45.png' },
  { name: 'Watan Alex', url: 'https://watan-alex.netlify.app/', img: '/screencapture-watan-alex-netlify-app-2026-06-17-21_36_09.png' },
  { name: 'Royal CCR', url: 'https://royalccr.ae/', img: '/screencapture-royalccr-ae-2026-06-17-21_41_02.png' },
  { name: 'Egyfield', url: 'https://egyfield.com/', img: '/screencapture-egyfield-2026-06-17-21_46_21.png' },
]

const carouselOpts = {
  rtl: false,
  loop: true,
  margin: 19,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  smartSpeed: 1000,
  navText: ['<i class="fas fa-chevron-right"></i>', '<i class="fas fa-chevron-left"></i>'],
  responsive: { 0: { items: 1 }, 600: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } },
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState(1)
  const owlRefs = useRef({})
  const { t, lang } = useTranslation()
  const tabs = t('projects.tabs').map((label, i) => ({ id: i + 1, label }))

  useEffect(() => {
    initCarousel(1)
    return () => {
      Object.keys(owlRefs.current).forEach(id => {
        const el = owlRefs.current[id]
        if (el && el.classList.contains('owl-loaded')) {
          try { window.$(el).owlCarousel('destroy') } catch {}
        }
      })
    }
  }, [])

  function initCarousel(id) {
    const el = owlRefs.current[id]
    if (el && !el.classList.contains('owl-loaded') && window.$) {
      window.$(el).owlCarousel(carouselOpts)
    }
  }

  function switchTab(id) {
    setActiveTab(id)
    setTimeout(() => initCarousel(id), 80)
  }

  return (
    <section id="work" className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
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

        <div className="n-tabs-wrapper">
          <div className="e-n-tabs" data-widget-number="1">
            <div className="e-n-tabs-heading" role="tablist">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className="e-n-tab-title"
                  aria-selected={activeTab === t.id}
                  data-tab-index={t.id}
                  role="tab"
                  tabIndex={activeTab === t.id ? 0 : -1}
                  aria-controls={`tab-content-${t.id}`}
                  onClick={() => switchTab(t.id)}
                >
                  <span className="e-n-tab-title-text">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="e-n-tabs-content">
              {tabs.map(t => (
                <div
                  key={t.id}
                  id={`tab-content-${t.id}`}
                  className={`e-con${activeTab === t.id ? ' e-active' : ''}`}
                  role="tabpanel"
                  data-tab-index={t.id}
                >
                  <div className="carousel-container">
                    <div
                      className="ue_listing_carousel owl-carousel owl-theme"
                      ref={el => { owlRefs.current[t.id] = el }}
                    >
                      {projects.map((p, i) => (
                        <div
                          key={i}
                          className="portfolio-card"
                          style={{ backgroundImage: `url(${p.img})` }}
                        >
                          <a className="card-btn" href={p.url} target="_blank" rel="noreferrer">
                            {p.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
