import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { playClick } from '../utils/clickSound'

const projects = [
  {
    title: 'Qasr Al Awani',
    category: 'Ramadan Campaign',
    color: 'from-amber-950/60 to-stone-900/40',
    image: '/3D Qasser - 1.png',
    images: ['/3D Qasser - 2.png'],
    youtubeId: '2PBcFUA_69s',
    hideContent: true,
    description: 'A conceptual Ramadan campaign created for Qasr Al Awani, showcasing their seasonal offers through a cinematic visual narrative. The concept presents each scene as a curated display, highlighting different moments of Ramadan hospitality — from family gatherings to outdoor travel settings.',
  },
  {
    title: 'Saudi FIFA 2034',
    category: 'UI / UX',
    color: 'from-blue-950/60 to-slate-900/40',
    image: '/FIFA Saudi-01.png',
    images: ['/FIFA Saudi-02.png'],
    modalBg: '#ffffff',
    modalText: '#111111',
    hideContent: true,
    description: 'UI/UX design concept for the Saudi FIFA 2034 World Cup app.',
  },
  {
    title: 'Solvent',
    category: 'Branding',
    color: 'from-amber-900/40 to-yellow-900/20',
    image: '/solvent.png',
    images: ['/Solvent-01.jpg', '/Solvent-02.jpg'],
    brandBackground: `Solvent is an art supply store that supports artists by providing essential materials and organizing art competitions that encourage creativity and self-expression. The brand is built around the idea that every artist leaves a unique mark on the world through their art.

The name Solvent comes from a painting medium used to mix and adjust paint for application on canvas, symbolizing the brand's role as a fundamental part of the creative process.

The logo combines a paintbrush and a thumbprint, representing artistic creation and individuality highlighting the idea that every artist leaves their own imprint. The color palette uses red, blue, and yellow, the primary colors in painting, reflecting the brand's vision of being an essential foundation for artists to create endless possibilities.`,
    description:
      'Full brand identity system for Solvent Art Supplies Store — logo design, colour system, typography, stationery, and brand collateral. Crafted a bold visual language that balances artistic expression with commercial clarity.',
  },
  {
    title: 'Tajassam',
    category: 'Branding',
    color: 'from-teal-900/40 to-cyan-950/20',
    image: '/Tajassam.png',
    images: ['/Tajassm-01.jpg', '/Tajassm-02.jpg'],
    brandBackground: `A portfolio for a 3D production studio specializing in 3D modeling, 3D video production, and social media visuals. The studio worked with multiple clients to create visual content that translates concepts into clear and engaging 3D experiences for brands and campaigns.

All visual elements of the portfolio were designed, including layout, typography, and visual direction. The design uses 3D renders, strong lighting, and structured layouts to highlight the studio's capabilities while maintaining a consistent visual identity across Arabic and English content.`,
    description:
      'Founded Tajassam 3D Production Agency — a Saudi-based studio specialising in CGI advertising and 3D content. Developed the full brand identity including logo, Arabic typography system, and visual language that bridges tech and craft.',
  },
  {
    title: 'Sara Cheese',
    category: 'Branding',
    color: 'from-teal-700/40 to-amber-800/20',
    image: '/sarah cheese logo.png',
    images: ['/Sarah cheese-01.jpg', '/Sarah cheese-02.jpg'],
    lightModal: true,
    brandBackground: `Sarah Cheese is a local dessert brand that presents traditional sweets in a modern way.

The logo combines illustration and typography in both Arabic and English, using a consistent style across both languages. A small bite detail in the illustration reflects how the dessert is typically eaten, adding a simple and relevant visual cue.`,
    description: 'Complete visual identity for Sara Cheese — a local dessert brand blending traditional sweets with a modern aesthetic. Logo design in Arabic and English, colour system, and brand collateral.',
  },
  {
    title: 'Ethara',
    category: 'Report Design',
    color: 'from-purple-800/50 to-teal-700/30',
    image: '/ETHARA-Laptop.png',
    images: ['/ETHARA-03.jpg', '/ETHARA-02.jpg'],
    modalBg: '#eae8ef',
    modalText: '#390084',
    brandBackground: `Project Overview

A Change Management report analyzing the challenges facing a large events and entertainment organization and proposing a shift toward a knowledge-driven innovation model. The report introduces an Emerging Technology Lab (ETL) to develop internal capabilities in areas such as AI, data, and immersive technologies, and outlines an implementation approach using Kotter's 8-Step Change Model.

Graphic Design Overview

The report uses a clean editorial layout with strong visual hierarchy to organize complex information clearly. Color, typography, imagery, and structured grids are used to guide the reader through sections such as challenges, solutions, and implementation, creating a professional and visually engaging document.`,
    description: 'Change management report design for Ethara — a large-scale events and entertainment organization. Editorial layout system combining strong typography, structured grids, and visual hierarchy to communicate complex strategic content.',
  },
  {
    title: 'Revive',
    category: 'Project Design',
    color: 'from-orange-900/40 to-amber-900/20',
    image: '/Revive.png',
    images: ['/Revive-01.jpg', '/Revive-02.jpg'],
    modalBg: '#f2ddc7',
    modalText: '#171717',
    brandBackground: `A sustainable design project exploring how ceramic waste from construction can be recycled into urban design elements such as outdoor shading structures, seating, and architectural screens, reducing landfill waste and supporting a circular use of materials.

I handled all visual design elements, including the infographic, layout, icons, and logo design. I named the project Revive, representing the idea of restoring ceramic waste back to life by repurposing it into new functional products that can be reused repeatedly. The colour palette is inspired by natural ceramic tones, and the design uses clear hierarchy and infographics to communicate the research and solution visually.`,
    description: 'Sustainable design project exploring how ceramic construction waste can be recycled into urban design elements. Full visual identity, infographic system, and editorial layout — all designed to communicate research and solutions with clarity.',
  },
  {
    title: 'Saudi Sports',
    category: 'Experience Design',
    color: 'from-zinc-800 to-neutral-900',
    description: 'Visual and experience design work for Saudi sports initiatives — combining spatial design, brand storytelling, and audience engagement to deliver immersive sports experiences.',
  },
  {
    title: 'EmTech Labs',
    category: 'Innovation & Technology',
    color: 'from-zinc-800 to-neutral-950',
    description: 'Design and creative direction for an Emerging Technology Lab — translating complex AI, data, and immersive technology concepts into engaging visual narratives and interactive experiences.',
  },
  {
    title: '3D Printing',
    category: 'Creative Technology',
    color: 'from-zinc-800 to-neutral-900',
    description: 'Explored and delivered 3D printing projects as part of creative technology prototyping, translating digital designs into physical outputs for client demonstrations and innovation showcases.',
  },
  {
    title: 'Large-Scale Event Design',
    category: 'Event Design',
    color: 'from-zinc-800 to-neutral-900',
    description: "Designed and executed PwC's presence at high-profile regional events such as COP28, Dubai Metaverse Assembly, AlUla Capacity Building Programme, and RUYA Careers 2024. End-to-end planning, AV setup, creative content, and on-site coordination.",
  },
  {
    title: '3D Concept Design',
    category: 'CGI & 3D',
    color: 'from-zinc-800 to-neutral-900',
    description: 'Founded Tajassm 3D Production Agency, specializing in CGI advertising videos and campaigns. Served notable clients including PNU, ZAN, and various government entities with high-quality 3D concept work.',
  },
  {
    title: 'Interactive Environment',
    category: 'Experience Design',
    color: 'from-zinc-800 to-neutral-900',
    description: 'Co-created three innovation lab spaces across the Middle East, integrating physical design, storytelling, and digital touchpoints. Designed experience flows and interactive environments for executive engagements and strategic client visits.',
  },
  {
    title: 'Digital Design Textbook',
    subtitle: 'Saudi High School Curriculum',
    category: 'Education',
    color: 'from-zinc-800 to-neutral-900',
    description: 'Authored lessons for the digital design book used in the Saudi high school curriculum, covering essential topics such as 3D modeling, advertising, motion graphics, and digital photography. Led workshops for Ministry of Education employees and teachers.',
  },
]

// ─── Modal (unchanged) ───────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
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
                  <img src={project.images[0]} alt={`${project.title} hero`} className="w-full object-cover rounded-t-2xl block" />
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

      {/* Title bar — slides into padded position on hover */}
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

        {/* Single arrow — rotates from ↗ to → on hover */}
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
  const [selected, setSelected] = useState(null)

  const openModal = (project) => {
    setSelected(project)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setSelected(null)
    document.body.style.overflow = ''
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
              key={project.title}
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
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
