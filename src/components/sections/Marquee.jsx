import { useTranslation } from '../../context/LanguageContext.jsx'

export default function Marquee() {
  const { t, lang } = useTranslation()
  const items = t('marquee')

  return (
    <div className="py-6 overflow-hidden border-y border-[var(--border)]" style={{ background: 'var(--bg-secondary)' }}>
      <div className="flex gap-0 marquee-track">
        <div className="flex shrink-0 gap-0 marquee-content-left">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex shrink-0">
              {items.map((text, i) => (
                <span key={i} className="whitespace-nowrap px-6 text-sm font-semibold tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent-electric)' }}>{text}</span>
                  {' '}
                  <span style={{ color: 'var(--accent-neon)' }}><i className="fas fa-star text-[8px]" /></span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-0 marquee-content-left" aria-hidden="true">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex shrink-0">
              {items.map((text, i) => (
                <span key={i} className="whitespace-nowrap px-6 text-sm font-semibold tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent-electric)' }}>{text}</span>
                  {' '}
                  <span style={{ color: 'var(--accent-neon)' }}><i className="fas fa-star text-[8px]" /></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track { animation: marquee-scroll 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
