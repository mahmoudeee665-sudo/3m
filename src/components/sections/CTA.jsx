import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, User, Phone, MessageSquare } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

const inputClasses = 'w-full rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-200 border focus:border-[var(--accent-fire)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-fire)_10%,transparent)]'

export default function CTA() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(true)
      return
    }
    setError(false)
    setSending(true)

    const msg = `Email: ${form.email}${form.phone ? `\nPhone: ${form.phone}\n\n` : '\n\n'}${form.message}`
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name: form.name, email: form.email, message: msg },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ).then(() => {
      setSubmitted(true)
    }).catch((err) => {
      console.error('EmailJS error:', err)
      setError(true)
    }).finally(() => {
      setSending(false)
    })
  }

  if (submitted) {
    return (
      <section id="contact" className="relative py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          background: 'radial-gradient(ellipse at 50% 50%, var(--accent-neon) 0%, transparent 60%)',
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 flex flex-col items-center gap-6 py-16 px-8 rounded-3xl border max-w-lg mx-auto text-center"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'color-mix(in srgb, var(--accent-neon) 15%, var(--border))',
          }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent-neon) 10%, transparent)' }}>
            <CheckCircle size={36} style={{ color: 'var(--accent-neon)' }} />
          </div>
          <p className="text-xl font-semibold">{t('cta.formSuccess')}</p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, var(--accent-fire) 0%, transparent 60%)',
        animation: 'pulse-glow 4s ease-in-out infinite alternate',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 w-full max-w-xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-space font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] mb-4">
            {t('cta.heading')}<br />
            <span style={{ color: 'var(--accent-fire)' }}>{t('cta.headingAccent')}</span>
          </h2>
          <p className="text-base md:text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('cta.desc')}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 md:p-8 border space-y-5"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Name */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
              <User size={15} />
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('cta.formName')}
              className={`${inputClasses} pl-11`}
              style={{
                background: 'var(--bg-tertiary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <Mail size={15} />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('cta.formEmail')}
                className={`${inputClasses} pl-11`}
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <Phone size={15} />
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t('cta.formPhone')}
                className={`${inputClasses} pl-11`}
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <span className="absolute left-4 top-4" style={{ color: 'var(--text-muted)' }}>
              <MessageSquare size={15} />
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder={t('cta.formMessage')}
              className={`${inputClasses} pl-11 resize-none`}
              style={{
                background: 'var(--bg-tertiary)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                style={{
                  background: 'color-mix(in srgb, var(--accent-fire) 6%, transparent)',
                  color: 'var(--accent-fire)',
                  border: '1px solid color-mix(in srgb, var(--accent-fire) 12%, transparent)',
                }}
              >
                <AlertCircle size={14} />
                {t('cta.formError')}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={sending}
            className="w-full border-none cursor-pointer text-sm font-semibold rounded-xl px-6 py-3.5 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ background: 'var(--accent-fire)', color: '#FFF7E9' }}
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
              </span>
            ) : (
              <>{t('cta.formSubmit')} <Send size={15} /></>
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          {t('cta.footnote')}
        </p>
      </motion.div>
    </section>
  )
}
