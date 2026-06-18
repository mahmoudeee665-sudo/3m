import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function CTA() {
  const { t, lang } = useTranslation()

  return (
    <section id="contact" className="relative py-32 px-6 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, var(--accent-electric) 0%, transparent 60%)',
          animation: 'pulse-glow 4s ease-in-out infinite alternate',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="font-space font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] mb-4">
          {t('cta.heading')}<br />
          <span style={{ color: 'var(--accent-electric)' }}>{t('cta.headingAccent')}</span>
        </h2>
        <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {t('cta.desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          {[
            { icon: MessageCircle, label: t('cta.chat'), sub: t('cta.whatsApp'), href: '#' },
            { icon: Mail, label: t('cta.email'), sub: 'hello@triple-m.dev', href: 'mailto:hello@triple-m.dev' },
            { icon: Phone, label: t('cta.call'), sub: '+1 (555) 123-4567', href: 'tel:+15551234567' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex flex-col items-center gap-2 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-electric)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <item.icon size={22} style={{ color: 'var(--accent-electric)' }} />
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.sub}</span>
            </a>
          ))}
        </div>

        <div className="relative inline-block group">
          <Button variant="gradient" size="lg" className="relative z-10 text-base md:text-lg px-10 py-4">
            {t('cta.btn')} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Button>
        </div>

        <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('cta.footnote')}
        </p>
      </motion.div>
    </section>
  )
}
