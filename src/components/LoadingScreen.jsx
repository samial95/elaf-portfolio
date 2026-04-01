import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase]   = useState('visible') // 'visible' | 'fading' | 'gone'
  const [lineW, setLineW]   = useState(0)          // 0 → 100 (%)

  useEffect(() => {
    // Animate the line from 0 → 100% over ~1.2s
    let start = null
    const DURATION = 1200

    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / DURATION, 1)
      // ease out cubic
      setLineW(1 - Math.pow(1 - p, 3))
      if (p < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    let raf = requestAnimationFrame(step)

    const onLoad = () => {
      // Wait for line to finish (at least 1.4s total) then fade
      const remaining = Math.max(0, DURATION + 300 - performance.now())
      setTimeout(() => {
        setPhase('fading')
        setTimeout(() => setPhase('gone'), 800)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      setTimeout(onLoad, 200)
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    const fallback = setTimeout(() => {
      setPhase('fading')
      setTimeout(() => setPhase('gone'), 800)
    }, 6000)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (phase === 'gone') return null

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
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Eyebrow label */}
      <p
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '0.58rem',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '20px',
          userSelect: 'none',
        }}
      >
        PORTFOLIO
      </p>

      {/* Main name */}
      <h1
        style={{
          fontFamily: '"OriyaMN", "Playfair Display", Georgia, serif',
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 'bold',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#ffffff',
          margin: 0,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        ELAF ALSALMAN
      </h1>

      {/* Animated line */}
      <div
        style={{
          marginTop: '28px',
          width: 'clamp(200px, 40vw, 420px)',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.75)',
            transformOrigin: 'left center',
            transform: `scaleX(${lineW})`,
            transition: 'none',
          }}
        />
      </div>
    </div>
  )
}
