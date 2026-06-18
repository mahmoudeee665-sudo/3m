export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer select-none transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-electric)] active:scale-[0.97]'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  if (variant === 'gradient') {
    return (
      <span
        className={`inline-flex rounded-full p-[2px] ${className}`}
        style={{
          background: 'linear-gradient(135deg, var(--accent-electric), var(--accent-neon), var(--accent-fire))',
        }}
      >
        <button
          className={`${base} ${sizes[size]} w-full rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-transparent transition-all duration-300`}
          {...props}
        >
          {children}
        </button>
      </span>
    )
  }

  const variants = {
    primary: 'bg-[var(--accent-electric)] text-white hover:brightness-110 hover:shadow-lg hover:shadow-[var(--glow-violet)]',
    ghost: 'border border-[var(--border)] text-[var(--text-primary)] bg-transparent hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-electric)]',
  }

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
