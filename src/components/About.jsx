import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

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

function FeaturedLink({ name, url }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
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
    </a>
  )
}

export default function About() {
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
            {/* Same size as "Selected Projects" */}
            <h2
              className="font-display font-semibold text-sand-50 uppercase"
              style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', letterSpacing: '0.06em' }}
            >
              ABOUT ELAF
            </h2>

            {/* Spline iframe — clipped container hides watermark */}
            <div
              className="mt-8 w-full"
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                maxWidth: '360px',
              }}
            >
              <iframe
                src="https://my.spline.design/gradientfollowcirclescopycopy-slYhVcmTV1kmCa9Qw38Argiw-UVL/"
                frameBorder="0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-5%',
                  width: '110%',
                  /* extend past the container to push watermark out of view */
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
            {/* Tagline */}
            <p
              className="text-sand-50 mb-10"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                letterSpacing: '0.14em',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              An experience maker by profession and a designer by heart.
            </p>

            {/* Body */}
            <div className="space-y-5 mb-12">
              <p
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Elaf brings 7+ years of experience across government institutions, consulting,
                innovation labs, startups, and digital agencies. She specialises in immersive
                experience design, executive engagements, and creative technology storytelling.
                At PwC, she led 65+ client tours and executive engagements&nbsp; combining GenAI,
                3D design, and AR/VR to simplify complex ideas into interactive demonstrations.
              </p>
              <p
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Recognised in leading regional media for contributions to emerging technology
                innovation and the growing role of women in the technology sector in Saudi Arabia.
              </p>
            </div>

            {/* Featured links */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              {mediaFeatures.map((f) => (
                <FeaturedLink key={f.name} name={f.name} url={f.url} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
