import { useTranslation } from '../../context/LanguageContext.jsx'

export default function Marquee() {
  const { t } = useTranslation()
  const items = t('marquee')

  return (
    <div className="overflow-hidden border-t border-b border-[var(--border)]" style={{ background: 'var(--bg-secondary)' }}>
      <div className="relative overflow-hidden py-6 md:py-8 space-y-4 md:space-y-5">
        {/* Row 1 — LTR */}
        <div className="flex marquee-ltr">
          {[...Array(3)].map((_, c) => (
            <div key={c} className="flex shrink-0 gap-3 md:gap-4 mx-1.5">
              {items.map((text, i) => (
                <span key={`${c}-${i}`} className="marquee-tag">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Row 2 — RTL alternate styling */}
        <div className="flex marquee-rtl">
          {[...Array(3)].map((_, c) => (
            <div key={c} className="flex shrink-0 gap-3 md:gap-4 mx-1.5">
              {[...items].reverse().map((text, i) => (
                <span key={`${c}-${i}`} className="marquee-tag marquee-tag-alt">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          .marquee-ltr { animation: scroll-ltr 45s linear infinite; width: max-content; }
          .marquee-rtl { animation: scroll-rtl 38s linear infinite; width: max-content; }
          .marquee-ltr:hover, .marquee-rtl:hover { animation-play-state: paused; }

          @keyframes scroll-ltr {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes scroll-rtl {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }

          .marquee-tag {
            display: inline-flex;
            align-items: center;
            padding: 8px 22px;
            border-radius: 100px;
            white-space: nowrap;
            flex-shrink: 0;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.02em;
            color: var(--text-secondary);
            background: var(--bg-primary);
            border: 1px solid color-mix(in srgb, var(--accent-electric) 8%, var(--border));
            transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          }
          .marquee-tag:hover {
            border-color: var(--accent-electric);
            transform: translateY(-2px);
            box-shadow: 0 4px 16px color-mix(in srgb, var(--accent-electric) 10%, transparent);
          }

          .marquee-tag-alt {
            background: transparent;
            border-color: color-mix(in srgb, var(--accent-fire) 8%, var(--border));
          }
          .marquee-tag-alt:hover {
            border-color: var(--accent-fire);
            box-shadow: 0 4px 16px color-mix(in srgb, var(--accent-fire) 10%, transparent);
          }

          @media (min-width: 768px) {
            .marquee-tag { padding: 10px 28px; font-size: 14px; gap: 10px; }
          }
        `}</style>
      </div>
    </div>
  )
}
