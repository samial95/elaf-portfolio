import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'

const mediaFeatures = [
  {
    name: 'THE NATIONAL',
    url: 'https://www.thenationalnews.com/gulf-news/2023/03/08/saudi-women-leading-tech-in-the-kingdom/',
  },
  {
    name: 'ABOUTHER',
    url: 'https://www.abouther.com/node/57241/people/leading-ladies/meet-forward-thinking-saudi-arab-women-pwc-middle-east-ksa#slide/1',
  },
]

// ── Featured link button ──────────────────────────────────────────────────────
function FeaturedLink({ name, url, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => onClick({ name, url })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? '#000000' : '#f5f5f4',
        padding: '10px 14px',
        background: hovered ? 'rgba(235,235,235,0.95)' : 'transparent',
        border: hovered ? '1px solid transparent' : '1px solid rgba(255,255,255,0.55)',
        borderRadius: 0,
        cursor: 'pointer',
        transition: 'background 0.35s ease, border-color 0.35s ease, color 0.3s ease',
      }}
    >
      FEATURED IN — {name}
      <ArrowUpRight
        size={13}
        strokeWidth={1.5}
        style={{
          flexShrink: 0,
          color: hovered ? '#000000' : '#ffffff',
          transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s ease',
        }}
      />
    </button>
  )
}

// ── Article pop-up modal ──────────────────────────────────────────────────────
function ArticleModal({ feature, onClose }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '80vh',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}>
            FEATURED IN — {feature.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open original article"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              Open original <ExternalLink size={11} strokeWidth={1.5} />
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Iframe + loading spinner */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Spinner while iframe loads */}
          {!loaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              background: '#0a0a0a',
              zIndex: 2,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '24px' }}>
                {[
                  { delay: '0ms', max: '18px', dur: '650ms' },
                  { delay: '130ms', max: '24px', dur: '700ms' },
                  { delay: '260ms', max: '14px', dur: '600ms' },
                  { delay: '80ms', max: '20px', dur: '680ms' },
                ].map((b, i) => (
                  <span key={i} style={{
                    display: 'block',
                    width: '3px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.6)',
                    animation: `loading-bar ${b.dur} ${b.delay} ease-in-out infinite`,
                    '--lmax': b.max,
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                Loading article…
              </span>
            </div>
          )}
          <iframe
            src={feature.url}
            title={feature.name}
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main About section ────────────────────────────────────────────────────────
export default function About() {
  const [activeFeature, setActiveFeature] = useState(null)

  return (
    <section id="about" className="pt-10 pb-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">

          {/* ── Left column: title + Spline ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-[38%] flex-shrink-0 flex flex-col"
          >
            <h2
              className="font-display font-semibold text-sand-50 uppercase"
              style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', letterSpacing: '0.06em' }}
            >
              ABOUT ELAF
            </h2>

            <div
              className="mt-8 w-full"
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1 / 1', maxWidth: '360px' }}
            >
              <iframe
                src="https://my.spline.design/gradientfollowcirclescopycopy-slYhVcmTV1kmCa9Qw38Argiw-UVL/"
                frameBorder="0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-5%',
                  width: '110%',
                  height: 'calc(100% + 160px)',
                  border: 'none',
                  background: 'transparent',
                }}
                title="About Elaf 3D"
              />
            </div>
          </motion.div>

          {/* ── Right column: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:w-[62%] flex flex-col justify-start pt-2 md:pt-[4.6rem]"
          >
            <p
              className="text-sand-50 mb-10"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', letterSpacing: '0.14em', lineHeight: 1.7, fontWeight: 400 }}
            >
              An experience maker by profession and a designer by heart.
            </p>

            <div className="space-y-5 mb-12">
              <p style={{ fontSize: '0.82rem', letterSpacing: '0.12em', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)' }}>
                Elaf brings 7+ years of experience across government institutions, consulting,
                innovation labs, startups, and digital agencies. She specialises in immersive
                experience design, executive engagements, and creative technology storytelling.
                At PwC, she led 65+ client tours and executive engagements&nbsp; combining GenAI,
                3D design, and AR/VR to simplify complex ideas into interactive demonstrations.
              </p>
              <p style={{ fontSize: '0.82rem', letterSpacing: '0.12em', lineHeight: 1.85, color: 'rgba(255,255,255,0.55)' }}>
                Recognised in leading regional media for contributions to emerging technology
                innovation and the growing role of women in the technology sector in Saudi Arabia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              {mediaFeatures.map((f) => (
                <FeaturedLink key={f.name} name={f.name} url={f.url} onClick={setActiveFeature} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article modal */}
      <AnimatePresence>
        {activeFeature && (
          <ArticleModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes loading-bar {
          0%, 100% { height: 3px; }
          50%       { height: var(--lmax, 20px); }
        }
      `}</style>
    </section>
  )
}
