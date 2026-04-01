import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const onLoad = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 700)
    }

    if (document.readyState === 'complete') {
      // Already loaded — short minimum display so it doesn't flash
      setTimeout(onLoad, 600)
    } else {
      window.addEventListener('load', onLoad, { once: true })
      // Safety fallback after 6s
      const t = setTimeout(onLoad, 6000)
      return () => { clearTimeout(t); window.removeEventListener('load', onLoad) }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Logo / name */}
      <p
        style={{
          fontFamily: '"OriyaMN", "Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.85)',
          userSelect: 'none',
        }}
      >
        ELAF ALSALMAN
      </p>

      {/* Animated bars — same style as music player */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '28px' }}>
        {[
          { delay: '0ms',   max: '22px', dur: '700ms' },
          { delay: '150ms', max: '14px', dur: '600ms' },
          { delay: '300ms', max: '28px', dur: '800ms' },
          { delay: '100ms', max: '18px', dur: '650ms' },
          { delay: '250ms', max: '12px', dur: '750ms' },
        ].map((b, i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '3px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.7)',
              animation: `loading-bar ${b.dur} ${b.delay} ease-in-out infinite`,
              '--lmax': b.max,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loading-bar {
          0%, 100% { height: 3px; }
          50%       { height: var(--lmax, 20px); }
        }
      `}</style>
    </div>
  )
}
