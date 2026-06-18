import { useTheme } from '../../context/ThemeContext.jsx'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border)] cursor-pointer transition-all duration-300 hover:border-[var(--accent-electric)] ${className}`}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          style={{ color: 'var(--accent-fire)' }}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          style={{ color: 'var(--accent-electric)' }}
        />
      </div>
    </button>
  )
}
