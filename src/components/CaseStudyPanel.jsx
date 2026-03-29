import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CaseStudyPanel({ project, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (project && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [project])

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: onClose,
      })
    }
  }

  if (!project) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end pointer-events-none">
      <div
        ref={panelRef}
        className="pointer-events-auto w-full max-w-2xl h-full overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(26,18,8,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(184, 134, 11, 0.2)',
        }}
      >
        <div className="p-10 pt-16">
          {/* Back button */}
          <button
            onClick={handleClose}
            className="flex items-center gap-2 mb-12 cursor-pointer bg-transparent border-none transition-colors duration-300 group"
            style={{ color: '#b8860b' }}
          >
            <span className="text-lg">←</span>
            <span
              className="text-sm tracking-wider uppercase group-hover:tracking-widest transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              back to workshop
            </span>
          </button>

          {/* Project title */}
          <h2
            className="text-4xl font-semibold mb-8 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#f5c842',
              textShadow: '0 0 30px rgba(245, 200, 66, 0.2)',
            }}
          >
            {project.title}
          </h2>

          {/* Placeholder image area */}
          <div
            className="w-full h-56 mb-10 rounded-sm flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1a1208 0%, #2a2015 100%)',
              border: '1px solid rgba(184, 134, 11, 0.15)',
            }}
          >
            <span className="text-sm tracking-widest uppercase" style={{ color: '#5c3d1a' }}>
              Project Visual
            </span>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-10">
            {project.description.map((point, i) => (
              <div key={i} className="flex gap-3">
                <span style={{ color: '#b8860b', fontSize: '0.6rem', marginTop: '0.5rem' }}>◆</span>
                <p className="text-base leading-relaxed" style={{ color: '#b0a080', fontFamily: 'Inter, sans-serif' }}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px mb-8" style={{ backgroundColor: 'rgba(184, 134, 11, 0.3)' }} />

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#666' }}>Role</span>
              <span className="text-sm" style={{ color: '#b0a080' }}>Lead Designer</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#666' }}>Year</span>
              <span className="text-sm" style={{ color: '#b0a080' }}>2024</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#666' }}>Tools</span>
              <span className="text-sm" style={{ color: '#b0a080' }}>Figma, Blender, React</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest block mb-1" style={{ color: '#666' }}>Duration</span>
              <span className="text-sm" style={{ color: '#b0a080' }}>8 weeks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
