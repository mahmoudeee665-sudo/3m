import { motion } from 'framer-motion'
import { useTranslation } from '../../context/LanguageContext.jsx'

const techs = [
  'React', 'Next.js', 'Node.js', 'Flutter', 'React Native',
  'Shopify', 'Stripe', 'Firebase', 'Supabase', 'Figma',
  'AWS', 'Vercel', 'MongoDB', 'PostgreSQL', 'TypeScript',
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
const itemAnim = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function TechStack() {
  const { t } = useTranslation()

  return (
    <section id="tech" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('techStack.label')}</span>
          <h2 className="section-heading">{t('techStack.heading')}</h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {techs.map((t, i) => (
            <motion.div
              key={i}
              variants={itemAnim}
              className="group relative px-5 py-3 rounded-full border text-sm font-medium cursor-default transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-electric)'; e.currentTarget.style.color = 'var(--accent-electric)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {t}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
