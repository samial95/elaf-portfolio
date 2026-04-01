import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'

const mediaFeatures = [
  {
    name: 'THE NATIONAL',
    url: 'https://www.thenationalnews.com/gulf-news/2023/03/08/saudi-women-leading-tech-in-the-kingdom/',
    publication: 'The National',
    date: 'March 08, 2023',
    headline: 'Saudi women leading tech in the kingdom',
    excerpt: 'Their growing footprint in the tech world is the latest of many achievements. Elaf Alsalman, PwC Lead 3D Creative Technologist, is featured among women shaping the future of technology in Saudi Arabia.',
    image: '/The nationl.png',
  },
  {
    name: 'ABOUTHER',
    url: 'https://www.abouther.com/node/57241/people/leading-ladies/meet-forward-thinking-saudi-arab-women-pwc-middle-east-ksa#slide/1',
    publication: 'AboutHer',
    date: 'March 08, 2023',
    headline: 'Meet The Forward-Thinking Saudi & Arab Women at PwC Middle East in KSA',
    excerpt: 'On IWD, we celebrate the strong female voices in leading corporations today. Elaf Alsalman — PwC Lead 3D Creative Technologist & Riyadh Lab Senior Associate — focuses on creating 3D modules for building prototypes and experiences that demonstrate the potential of new emerging technologies.',
    image: '/AboutHer.png',
  },
]

// ── Featured link button ──────────────────────────────────────────────────────
function FeaturedLink({ name, url, feature, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => onClick(feature)}
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
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef(null)

  // If image is already cached, onLoad won't fire — check on mount
  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
        padding: '40px 20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto',
          background: '#0c0c0c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top bar ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            FEATURED IN — {feature.name}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            <X size={13} />
          </button>
        </div>

        {/* ── Screenshot image ── */}
        <div style={{ position: 'relative', width: '100%', background: '#111' }}>
          {!imgLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '20px' }}>
                {[{d:'0ms',m:'16px',t:'650ms'},{d:'130ms',m:'22px',t:'700ms'},{d:'260ms',m:'12px',t:'600ms'},{d:'80ms',m:'18px',t:'680ms'}].map((b,i)=>(
                  <span key={i} style={{ display:'block', width:'3px', borderRadius:'2px', background:'rgba(255,255,255,0.4)', animation:`loading-bar ${b.t} ${b.d} ease-in-out infinite`, '--lmax': b.m }} />
                ))}
              </div>
            </div>
          )}
          <img
            ref={imgRef}
            src={feature.image}
            alt={feature.headline}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>

        {/* ── Article details ── */}
        <div style={{ padding: '28px 28px 24px' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>
            {feature.publication} · {feature.date}
          </p>
          <h3 style={{
            fontFamily: '"OriyaMN", "Playfair Display", Georgia, serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: '14px',
          }}>
            {feature.headline}
          </h3>
          <p style={{ fontSize: '0.78rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', marginBottom: '28px' }}>
            {feature.excerpt}
          </p>

          {/* CTA */}
          <a
            href={feature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 22px',
              background: '#ffffff',
              color: '#000000',
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
              borderRadius: 0,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(235,235,235,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ffffff' }}
          >
            Read Full Article <ExternalLink size={12} strokeWidth={2} />
          </a>
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
                <FeaturedLink key={f.name} name={f.name} url={f.url} feature={f} onClick={setActiveFeature} />
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
