export default function SectionDivider({ flip }) {
  return (
    <div className="relative h-20 md:h-28 -my-1 overflow-hidden pointer-events-none" style={{ background: 'var(--bg-primary)' }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        {flip ? (
          <>
            <path fill="var(--bg-primary)" d="M0,10 C180,80 360,0 540,60 C720,120 900,10 1080,50 C1260,90 1350,20 1440,40 L1440,120 L0,120 Z" />
            <path fill="var(--bg-secondary)" d="M0,30 C240,100 480,20 720,80 C960,140 1200,30 1440,60 L1440,120 L0,120 Z" opacity="0.85" />
          </>
        ) : (
          <>
            <path fill="var(--bg-primary)" d="M0,110 C180,40 360,120 540,60 C720,0 900,110 1080,70 C1260,30 1350,100 1440,80 L1440,0 L0,0 Z" />
            <path fill="var(--bg-secondary)" d="M0,90 C240,20 480,100 720,40 C960,-20 1200,90 1440,60 L1440,0 L0,0 Z" opacity="0.85" />
          </>
        )}
      </svg>
    </div>
  )
}
