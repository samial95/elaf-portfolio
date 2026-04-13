import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { playClick } from '../utils/clickSound'

const projects = [
  {
    title: 'Qasr Al Awani',
    category: '3D Videography',
    color: 'from-amber-950/60 to-stone-900/40',
    image: '/3D Qasser -1 .jpg',
    images: ['/3D Qasser -2.jpg'],
    youtubeId: '2PBcFUA_69s',
    hideContent: true,
    description: 'A conceptual Ramadan campaign created for Qasr Al Awani, showcasing their seasonal offers through a cinematic visual narrative.',
  },
  {
    title: 'EmTech Labs',
    category: 'Interior Design',
    color: 'from-zinc-800 to-neutral-950',
    image: '/3D Labs -01.jpg',
    images: ['/3D Labs -02.jpg'],
    hideContent: true,
  },
  {
    title: 'Solvent',
    category: 'Identity Design',
    color: 'from-amber-900/40 to-yellow-900/20',
    image: '/Solvent-01.jpg',
    images: ['/Solvent-02.jpg'],
    hideContent: true,
  },
  {
    title: 'Ethara',
    category: 'Report Design',
    color: 'from-purple-800/50 to-teal-700/30',
    image: '/ETHARA-01.jpg',
    images: ['/ETHARA-02.jpg'],
    hideContent: true,
    modalBg: '#eae8ef',
    modalText: '#390084',
  },
  {
    title: 'Saudi FIFA 2034',
    category: 'UI / UX',
    color: 'from-blue-950/60 to-slate-900/40',
    image: '/FIFA Saudi-01.jpg',
    images: ['/FIFA Saudi-02.jpg'],
    modalBg: '#ffffff',
    modalText: '#111111',
    hideContent: true,
    description: 'UI/UX design concept for the Saudi FIFA 2034 World Cup app.',
  },
  {
    title: 'Sara Cheese',
    category: 'Identity Design',
    color: 'from-teal-700/40 to-amber-800/20',
    image: '/Sarah cheese-01.jpg',
    images: ['/Sarah cheese-02.jpg'],
    lightModal: true,
    hideContent: true,
  },
  {
    title: 'Revive',
    category: 'Project Design',
    color: 'from-orange-900/40 to-amber-900/20',
    image: '/Revive-01.jpg',
    images: ['/Revive-02.jpg'],
    hideContent: true,
    modalBg: '#f2ddc7',
    modalText: '#171717',
  },
  {
    title: 'Tajassam',
    category: 'Identity Design',
    color: 'from-teal-900/40 to-cyan-950/20',
    image: '/Tajassm-01.jpg',
    images: ['/Tajassm-02.jpg'],
    hideContent: true,
  },
]

// ─── Modal hero image with loader ────────────────────────────────────────────
function ModalHeroImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '16px', background: '#0a0a0a', zIndex: 1, minHeight: '200px',
          borderRadius: '1rem 1rem 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '24px' }}>
            {[{d:'0ms',m:'18px',t:'650ms'},{d:'140ms',m:'24px',t:'700ms'},{d:'280ms',m:'14px',t:'600ms'},{d:'90ms',m:'20px',t:'680ms'}].map((b,i)=>(
              <span key={i} style={{ display:'block', width:'3px', borderRadius:'2px', background:'rgba(255,255,255,0.5)', animation:`modal-bar ${b.t} ${b.d} ease-in-out infinite`, '--mmax': b.m }} />
            ))}
          </div>
          <span style={{ fontSize:'0.58rem', letterSpacing:'0.2em', color:'rgba(255,255,255,0.25)', textTransform:'uppercase' }}>Loading…</span>
        </div>
      )}
      <img
        src={src} alt={alt}
        onLoad={() => setLoaded(true)}
        className="w-full object-cover rounded-t-2xl block"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </div>
  )
}

// ─── Nav project card ─────────────────────────────────────────────────────────
function NavProjectCard({ project, direction, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isLeft = direction === 'prev'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '16px',
        borderRadius: '8px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        transition: 'background 0.25s ease',
        alignItems: isLeft ? 'flex-start' : 'flex-end',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '75%',
        aspectRatio: '16/9',
        borderRadius: '4px',
        overflow: 'hidden',
        background: '#111',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.4s ease',
              opacity: hovered ? 1 : 0.7,
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, #1a1a1a, #0a0a0a)` }} />
        )}
      </div>

      {/* Label + name */}
      <div style={{ textAlign: isLeft ? 'left' : 'right' }}>
        <p style={{
          margin: '0 0 4px',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: isLeft ? 'flex-start' : 'flex-end',
        }}>
          {isLeft && <ChevronLeft size={10} strokeWidth={2} />}
          {isLeft ? 'Previous' : 'Next'}
          {!isLeft && <ChevronRight size={10} strokeWidth={2} />}
        </p>
        <p style={{
          margin: 0,
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)',
          transition: 'color 0.25s ease',
        }}>
          {project.title}
        </p>
      </div>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, projects, currentIndex, onNavigate }) {
  const overlayRef = useRef(null)

  // Scroll to top on project change
  useEffect(() => {
    if (overlayRef.current) overlayRef.current.scrollTop = 0
  }, [project])

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null
  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : null
  const prevProject = prevIndex !== null ? projects[prevIndex] : null
  const nextProject = nextIndex !== null ? projects[nextIndex] : null

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-start justify-center px-2 md:px-4 pt-10 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-[96vw] md:max-w-[65vw] rounded-t-2xl"
          style={{
            backgroundColor: project.modalBg || (project.lightModal ? '#F5F0EA' : '#050505'),
            border: `1px solid ${project.modalBg ? 'rgba(0,0,0,0.08)' : project.lightModal ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(() => {
            const isLight = !!(project.modalBg || project.lightModal)
            const txtMain  = project.modalText || (isLight ? '#1c1917' : '#f5f5f4')
            const txtSub   = project.modalText ? project.modalText + 'aa' : (isLight ? '#57534e' : '#a8a29e')
            const txtMuted = project.modalText ? project.modalText + '88' : (isLight ? '#78716c' : '#78716c')
            const borderC  = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'
            return (
              <>
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
                  <X size={20} />
                </button>
                {project.images ? (
                  <ModalHeroImage src={project.images[0]} alt={`${project.title} hero`} />
                ) : (
                  <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center rounded-t-2xl`}>
                    <span className="text-white/40 text-sm uppercase tracking-widest">Images Coming Soon</span>
                  </div>
                )}
                {!project.hideContent && (
                  <div className="px-10 md:px-16 py-12">
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: txtMuted }}>{project.category}</p>
                    <h3 className="font-display text-3xl md:text-4xl font-semibold mb-1" style={{ color: txtMain }}>{project.title}</h3>
                    {project.subtitle && <p className="text-sm mt-1" style={{ color: txtSub }}>{project.subtitle}</p>}
                    {project.brandBackground && (
                      <div className="mt-12 pt-10 flex flex-col md:flex-row gap-10 md:gap-16" style={{ borderTop: `1px solid ${borderC}` }}>
                        <div className="md:w-[38%] flex-shrink-0">
                          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight" style={{ color: txtMain }}>BACKGROUND</h2>
                        </div>
                        <div className="md:w-[62%] space-y-4">
                          {project.brandBackground.split('\n\n').map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed" style={{ color: txtSub }}>{para}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {project.images?.slice(1).map((src, i) => (
                  <img key={i} src={src} alt={`${project.title} ${i + 2}`} className="w-full object-cover block" />
                ))}

                {/* YouTube embed */}
                {project.youtubeId && (
                  <div className="px-10 md:px-16 pb-12 pt-8">
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}`}
                        title={`${project.title} video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}
                {project.pdf && (
                  <div className="px-10 md:px-16 pb-12">
                    <div className="pt-10" style={{ borderTop: `1px solid ${borderC}` }}>
                      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: txtMuted }}>Project PDF</p>
                      <div className="rounded-xl overflow-hidden" style={{ height: '80vh', border: `1px solid ${borderC}` }}>
                        <iframe src={`${project.pdf}#toolbar=1&navpanes=0&view=FitH`} className="w-full h-full" title={`${project.title} PDF`} />
                      </div>
                      <a href={project.pdf} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                        style={{ color: txtMuted }}>Open in new tab ↗</a>
                    </div>
                  </div>
                )}

                {/* ── Next / Prev navigation ── */}
                {(prevProject || nextProject) && (
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 12px 0',
                    display: 'flex',
                    gap: '8px',
                    background: '#050505',
                  }}>
                    {prevProject ? (
                      <NavProjectCard
                        project={prevProject}
                        direction="prev"
                        onClick={() => onNavigate(prevIndex)}
                      />
                    ) : <div style={{ flex: 1 }} />}
                    {nextProject ? (
                      <NavProjectCard
                        project={nextProject}
                        direction="next"
                        onClick={() => onNavigate(nextIndex)}
                      />
                    ) : <div style={{ flex: 1 }} />}
                  </div>
                )}
              </>
            )
          })()}
        </motion.div>
      </div>
    </motion.div>
  )
}


// ─── Grid card ───────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 90 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => { playClick(); onOpen(project) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      {/* Image box */}
      <div
        className="w-full overflow-hidden mb-4"
        style={{
          aspectRatio: '16/9',
          background: '#0d0d0d',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease, opacity 0.4s ease',
              transform: hovered ? 'scale(1.09)' : 'scale(1)',
              opacity: hovered ? 1 : 0.7,
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.color}`} />
        )}
      </div>

      {/* Category */}
      <p
        style={{
          margin: '0 0 6px',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
        }}
      >
        {project.category}
      </p>

      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: hovered ? '10px 14px' : '10px 0px',
          borderRadius: '0',
          background: hovered ? 'rgba(235,235,235,0.95)' : 'transparent',
          transition: 'background 0.35s ease, padding 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <h3
          className="font-display font-semibold uppercase"
          style={{
            fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
            letterSpacing: '0.06em',
            lineHeight: 1.2,
            color: hovered ? '#000000' : '#f5f5f4',
            margin: 0,
            transition: 'color 0.3s ease',
          }}
        >
          {project.title}
        </h3>

        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          style={{
            flexShrink: 0,
            marginLeft: '8px',
            color: hovered ? '#000000' : '#ffffff',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s ease',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
const INITIAL_COUNT = 6

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const openModal = (project) => {
    const idx = projects.indexOf(project)
    setSelectedIndex(idx)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
  }
  const navigate = (idx) => {
    setSelectedIndex(idx)
  }

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <section id="projects" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2
            className="font-display font-semibold text-sand-50 uppercase"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', letterSpacing: '0.06em' }}
          >
            Selected Projects
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.title + i}
              project={project}
              index={i}
              onOpen={openModal}
            />
          ))}
        </div>

        {/* Show More */}
        {projects.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => { playClick(); setShowAll(v => !v) }}
              onMouseEnter={playClick}
              className="glow-btn px-8 py-3 text-xs font-medium rounded-full text-sand-50 uppercase tracking-widest transition-all duration-300"
            >
              {showAll ? 'Show Less' : 'Show More Projects'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <ProjectModal
            project={projects[selectedIndex]}
            onClose={closeModal}
            projects={projects}
            currentIndex={selectedIndex}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
