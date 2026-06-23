import { useTheme } from '../../context/ThemeContext.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { Sun, Moon, Languages } from 'lucide-react'

export default function NavControls() {
  const { dark, toggle } = useTheme()
  const { lang, setLang } = useTranslation()

  return (
    <div
      className="flex items-center rounded-full"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
        padding: 3,
      }}
    >
      <button
        onClick={toggle}
        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: dark ? 'var(--accent-electric)' : 'var(--accent-fire)',
          color: '#FFF7E9',
          boxShadow: dark
            ? '0 0 12px rgba(139, 92, 246, 0.35)'
            : '0 0 12px rgba(211, 98, 69, 0.35)',
        }}
        title={dark ? 'Light Mode' : 'Dark Mode'}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </button>

      <div
        className="w-px h-4 rounded-full mx-2"
        style={{ background: 'var(--border)' }}
        aria-hidden="true"
      />

      <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        className="flex items-center gap-1.5 px-2.5 h-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-accent"
        style={{
          color: 'var(--text-secondary)',
        }}
        title="Language"
        aria-label="Toggle language"
      >
        <Languages size={13} />
        <span className="text-xs font-semibold tracking-wider">{lang === 'en' ? 'AR' : 'EN'}</span>
      </button>
    </div>
  )
}
