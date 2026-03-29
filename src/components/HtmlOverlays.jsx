import { useState, useEffect } from 'react'

function ScrollIndicator({ visible }) {
  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="text-xs tracking-[0.25em] uppercase"
        style={{ color: 'rgba(184, 134, 11, 0.6)', fontFamily: 'Inter, sans-serif' }}
      >
        scroll to enter
      </span>
      <div className="w-px h-8 relative overflow-hidden" style={{ backgroundColor: 'rgba(184, 134, 11, 0.2)' }}>
        <div
          className="w-full h-3 absolute animate-bounce"
          style={{ backgroundColor: 'rgba(245, 200, 66, 0.6)' }}
        />
      </div>
    </div>
  )
}

function AboutOverlay({ visible }) {
  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-20 transition-all duration-700 max-w-md"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) translateX(${visible ? 0 : 40}px)`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="glass-panel rounded-sm p-8">
        <span
          className="text-xs tracking-[0.3em] uppercase block mb-4"
          style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}
        >
          02 — About
        </span>
        <h2
          className="text-3xl font-semibold mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#f5c842',
            textShadow: '0 0 30px rgba(245, 200, 66, 0.15)',
          }}
        >
          About
        </h2>
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: '#b0a080', fontFamily: 'Inter, sans-serif' }}
        >
          I'm Elaf — a designer who treats every project like a craft. Precise where it matters,
          flexible where it doesn't, and always working toward the reaction that makes someone
          stop and look twice.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {['3D / Spatial Design', 'Interaction Design', 'Brand & Visual'].map((skill) => (
            <div
              key={skill}
              className="p-3 rounded-sm text-center"
              style={{
                background: 'rgba(184, 134, 11, 0.08)',
                border: '1px solid rgba(184, 134, 11, 0.15)',
              }}
            >
              <span className="text-xs" style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsOverlay({ visible }) {
  return (
    <div
      className="fixed left-8 bottom-10 z-20 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 20}px)`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}
      >
        03 — Projects
      </span>
      <h2
        className="text-2xl font-semibold mt-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#f5c842',
          textShadow: '0 0 30px rgba(245, 200, 66, 0.15)',
        }}
      >
        The Display Shelf
      </h2>
      <p className="text-sm mt-2 max-w-xs" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
        Hover and click on the objects to explore each project
      </p>
    </div>
  )
}

function SkillsOverlay({ visible }) {
  const skills = ['Figma', 'Three.js', 'Blender', 'React', 'Photography', 'Art Direction']

  return (
    <div
      className="fixed left-8 bottom-10 z-20 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 20}px)`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}
      >
        04 — Skills
      </span>
      <h2
        className="text-2xl font-semibold mt-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#f5c842',
          textShadow: '0 0 30px rgba(245, 200, 66, 0.15)',
        }}
      >
        The Tool Wall
      </h2>
      <div className="flex flex-wrap gap-2 mt-4 max-w-sm">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-sm"
            style={{
              background: 'rgba(184, 134, 11, 0.1)',
              border: '1px solid rgba(184, 134, 11, 0.2)',
              color: '#b0a080',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function TimelineOverlay({ visible }) {
  return (
    <div
      className="fixed left-8 bottom-10 z-20 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 20}px)`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}
      >
        05 — Timeline
      </span>
      <h2
        className="text-2xl font-semibold mt-2"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#f5c842',
          textShadow: '0 0 30px rgba(245, 200, 66, 0.15)',
        }}
      >
        The Pinboard
      </h2>
    </div>
  )
}

function ContactOverlay({ visible }) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="text-center max-w-lg px-6">
        <span
          className="text-xs tracking-[0.3em] uppercase block mb-6"
          style={{ color: '#b8860b', fontFamily: 'Inter, sans-serif' }}
        >
          06 — Contact
        </span>
        <h2
          className="text-5xl font-semibold mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#f5c842',
            textShadow: '0 0 40px rgba(245, 200, 66, 0.2)',
          }}
        >
          Let's build something.
        </h2>
        <p className="text-base mb-10" style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>
          Open to projects, collaborations, and conversations.
        </p>
        <div className="flex gap-4 justify-center mb-10">
          <a
            href="mailto:hello@elaf.design"
            className="btn-workshop px-6 py-3 text-sm tracking-wider uppercase no-underline"
          >
            Send an email
          </a>
          <a
            href="#"
            className="btn-workshop px-6 py-3 text-sm tracking-wider uppercase no-underline"
            style={{ background: 'transparent' }}
          >
            View LinkedIn
          </a>
        </div>
        <p className="text-xs" style={{ color: '#444', fontFamily: 'Inter, sans-serif' }}>
          © Elaf 2025
        </p>
      </div>
    </div>
  )
}

export default function HtmlOverlays({ activeSection, caseStudyOpen }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Hide all overlays when case study is open
  if (caseStudyOpen) return null

  return (
    <>
      {activeSection === 0 && <ScrollIndicator visible={showScrollIndicator && activeSection === 0} />}
      <AboutOverlay visible={activeSection === 1} />
      <ProjectsOverlay visible={activeSection === 2} />
      <SkillsOverlay visible={activeSection === 3} />
      <TimelineOverlay visible={activeSection === 4} />
      <ContactOverlay visible={activeSection === 5} />

      {/* Section label — top left */}
      {activeSection > 0 && (
        <div className="fixed top-8 left-8 z-20">
          <div className="w-8 h-px mb-3" style={{ backgroundColor: 'rgba(184, 134, 11, 0.3)' }} />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(184, 134, 11, 0.4)', fontFamily: 'Inter, sans-serif' }}
          >
            The Workshop
          </span>
        </div>
      )}
    </>
  )
}
