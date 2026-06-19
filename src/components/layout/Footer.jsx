import ThemeToggle from '../ui/ThemeToggle.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Footer() {
  const { t, lang, dir } = useTranslation()
  const { dark } = useTheme()

  const footerLinks = [
    {
      title: t('footer.services'),
      links: [t('footer.about'), t('footer.careers'), t('footer.blog'), t('footer.contact')],
    },
    {
      title: t('footer.company'),
      links: [t('footer.about'), t('footer.careers'), t('footer.blog'), t('footer.contact')],
    },
  ]

  const socials = [
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter/X', href: '#' },
    { name: 'Dribbble', href: '#' },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img
              src={dark ? '/logos/White.svg' : '/logos/dark%20purp.svg'}
              alt="triple m"
              className="h-8 w-auto"
            />
            <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('footer.tagline')}
            </p>
          </div>
          {footerLinks.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}
                       onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-electric)'}
                       onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>{t('footer.social')}</h4>
            <ul className="space-y-2">
              {socials.map(s => (
                <li key={s.name}>
                  <a href={s.href} className="text-sm transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-electric)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 triple m · {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-xs transition-colors" style={{ color: 'var(--text-muted)' }}
               onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {t('footer.terms')}
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
