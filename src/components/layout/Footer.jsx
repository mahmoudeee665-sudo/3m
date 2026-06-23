import { useNavigate, useLocation, Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Footer() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  function scrollTo(id) {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      const timer = setInterval(() => {
        const el = document.getElementById(id)
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); clearInterval(timer) }
      }, 50)
      setTimeout(() => clearInterval(timer), 3000)
    }
  }

  const navLinks = [
    { label: t('footer.servicesLink'), id: 'services' },
    { label: t('footer.process'), id: 'process' },
    { label: t('footer.projects'), id: 'work' },
    { label: t('footer.aboutUs'), id: 'about' },
    { label: t('footer.team'), id: 'team' },
    { label: t('footer.contact'), id: 'contact' },
  ]

  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590725834401' },
    { name: 'Instagram', href: 'https://www.instagram.com/3m_.tech/' },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={dark ? '/logos/White.svg' : '/logos/dark%20purp.svg'}
              alt="triple m"
              className="h-7 w-auto"
            />
            <span className="text-sm font-medium hidden sm:inline" style={{ color: 'var(--accent-fire)' }}>
              {t('footer.tagline')}
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-fire)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium transition-colors duration-200 no-underline"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-fire)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 triple m &middot; {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs transition-colors no-underline" style={{ color: 'var(--text-muted)' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-xs transition-colors no-underline" style={{ color: 'var(--text-muted)' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {t('footer.terms')}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}