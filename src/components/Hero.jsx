import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { playClick } from '../utils/clickSound'

const ease = [0.16, 1, 0.3, 1]

const mobileStyles = `
  @media (max-width: 767px) {
    .hero-name {
      font-size: clamp(1.6rem, 9vw, 2.6rem) !important;
      white-space: normal !important;
    }
    .hero-meta {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 14px !important;
    }
    .hero-ctas {
      flex-direction: row;
    }
    .hero-spline {
      left: 32px !important;
      right: 32px !important;
      top: calc(33.25vh + 20px) !important;
    }
    .hero-text-block {
      top: max(88px, calc(19vh - 7.5px)) !important;
    }
  }
`

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        background: '#000000',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <style>{mobileStyles}</style>

      {/* ── ALIGNED CONTAINER — mirrors navbar max-w-7xl mx-auto px-8 ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '56px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 32px',
            position: 'relative',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* ── NAME + SUBTITLE — pinned 65px above the Spline, 26px gap between ── */}
          <motion.div
            className="hero-text-block"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.0, ease }}
            style={{
              position: 'absolute',
              left: '32px',
              right: '32px',
              /* top: always at least 88px below viewport top (clears fixed navbar),
                 but scales up with vh so it stays close to the Spline on taller screens */
              top: 'max(88px, calc(38vh - 110px))',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              pointerEvents: 'auto',
            }}
          >
            {/* NAME */}
            <h1
              className="hero-name"
              style={{
                margin: 0,
                fontFamily: '"OriyaMN", "Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(2.8rem, 3.8vw, 3.8rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: '#ffffff',
                whiteSpace: 'nowrap',
              }}
            >
              Elaf Alsalman
            </h1>

            {/* SUBTITLE + CTAs */}
            <div
              className="hero-meta"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.42)',
                }}
              >
                Creative Designer &amp; Experience Maker
              </p>

              <div style={{ display: 'flex', gap: '28px', flexShrink: 0 }}>
                <a
                  href="#projects"
                  onMouseEnter={playClick}
                  onClick={playClick}
                  style={{
                    textDecoration: 'none',
                    color: '#ffffff',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseOut={e => e.currentTarget.style.color = '#ffffff'}
                >
                  View Work <ArrowUpRight size={11} strokeWidth={1.6} />
                </a>
                <a
                  href="#contact"
                  onMouseEnter={playClick}
                  onClick={playClick}
                  style={{
                    textDecoration: 'none',
                    color: '#ffffff',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseOut={e => e.currentTarget.style.color = '#ffffff'}
                >
                  Get in Touch <ArrowUpRight size={11} strokeWidth={1.6} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SPLINE SCENE ──────────────────────────────────────────── */}
      <motion.div
        className="hero-spline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        style={{
          position: 'absolute',
          top: '38vh',
          left: 0,
          right: 0,
          bottom: '56px',
          zIndex: 1,
          pointerEvents: 'auto',
        }}
      >
        <iframe
          src="https://my.spline.design/test-6hmj0ElDdymnkswmGShnb7lc/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ display: 'block', border: 'none' }}
        />
        {/* Transparent overlay so scroll events reach the page instead of the iframe */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: 'transparent',
          }}
        />
      </motion.div>

      {/* ── BOTTOM BAR ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          zIndex: 2,
          background: '#000000',
        }}
      >
        <span style={{ display: 'block', width: 26, height: 1, background: 'rgba(255,255,255,0.3)' }} />
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>
          Scroll to See More
        </span>
        <span style={{ display: 'block', width: 26, height: 1, background: 'rgba(255,255,255,0.3)' }} />
      </div>
    </section>
  )
}
