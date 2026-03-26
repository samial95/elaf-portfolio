import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const projects = [
  {
    title: 'Solvent',
    category: 'Branding',
    color: 'from-amber-900/40 to-yellow-900/20',
    image: '/solvent.png',
    images: ['/Solvent-01.jpg', '/Solvent-02.jpg'],
    brandBackground: `Solvent is an art supply store that supports artists by providing essential materials and organizing art competitions that encourage creativity and self-expression. The brand is built around the idea that every artist leaves a unique mark on the world through their art.

The name Solvent comes from a painting medium used to mix and adjust paint for application on canvas, symbolizing the brand's role as a fundamental part of the creative process.

The logo combines a paintbrush and a thumbprint, representing artistic creation and individuality highlighting the idea that every artist leaves their own imprint. The color palette uses red, blue, and yellow, the primary colors in painting, reflecting the brand's vision of being an essential foundation for artists to create endless possibilities.`,
    brandColors: [
      { hex: '#990A2E', label: '#990A2E' },
      { hex: '#E6AE17', label: '#E6AE17' },
      { hex: '#2272A4', label: '#2272A4' },
      { hex: '#EFEFEF', label: '#EFEFEF', dark: true },
    ],
    description:
      'Full brand identity system for Solvent Art Supplies Store — logo design, colour system, typography, stationery, and brand collateral. Crafted a bold visual language that balances artistic expression with commercial clarity.',
  },
  {
    title: 'Tajassam',
    category: 'Branding',
    color: 'from-teal-900/40 to-cyan-950/20',
    image: '/Tajassam.png',
    pdf: '/tajassam-profile.pdf',
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
    image: '/ETHARA Laptop .png',
    images: ['/ETHARA-02.jpg', '/ETHARA-03.jpg'],
    modalBg: '#eae8ef',
    modalText: '#390084',
    brandBackground: `Project Overview

A Change Management report analyzing the challenges facing a large events and entertainment organization and proposing a shift toward a knowledge-driven innovation model. The report introduces an Emerging Technology Lab (ETL) to develop internal capabilities in areas such as AI, data, and immersive technologies, and outlines an implementation approach using Kotter's 8-Step Change Model.

Graphic Design Overview

The report uses a clean editorial layout with strong visual hierarchy to organize complex information clearly. Color, typography, imagery, and structured grids are used to guide the reader through sections such as challenges, solutions, and implementation, creating a professional and visually engaging document.`,
    description: 'Change management report design for Ethara — a large-scale events and entertainment organization. Editorial layout system combining strong typography, structured grids, and visual hierarchy to communicate complex strategic content.',
  },
  {
    title: 'MG Taylor Visual Systems',
    category: 'Visual Systems',
    color: 'from-emerald-900/40 to-teal-900/20',
    description:
      'Designed and implemented visual systems for MG Taylor, integrating physical design, storytelling, and digital touchpoints to support seamless workshops and strategic conversations.',
  },
  {
    title: 'COP25 Sustainability Experience',
    category: 'Event Design',
    color: 'from-sky-900/40 to-blue-900/20',
    description:
      'Oversaw end-to-end creative delivery for a high-profile sustainability event — including AV setup, creative content, and on-site coordination for immersive experiences with over 100 attendees.',
  },
  {
    title: '3D Printing',
    category: 'Creative Technology',
    color: 'from-amber-900/40 to-orange-900/20',
    description:
      'Explored and delivered 3D printing projects as part of creative technology prototyping, translating digital designs into physical outputs for client demonstrations and innovation showcases.',
  },
  {
    title: 'Large-Scale Event Design',
    category: 'Event Design',
    color: 'from-pink-900/40 to-rose-900/20',
    description:
      'Designed and executed PwC\'s presence at high-profile regional events such as COP28, Dubai Metaverse Assembly, AlUla Capacity Building Programme, and RUYA Careers 2024. End-to-end planning, AV setup, creative content, and on-site coordination.',
  },
  {
    title: '3D Concept Design',
    category: 'CGI & 3D',
    color: 'from-indigo-900/40 to-violet-900/20',
    description:
      'Founded Tajassm 3D Production Agency, specializing in CGI advertising videos and campaigns. Served notable clients including PNU, ZAN, and various government entities with high-quality 3D concept work.',
  },
  {
    title: 'Interactive Environment',
    category: 'Experience Design',
    color: 'from-teal-900/40 to-cyan-900/20',
    description:
      'Co-created three innovation lab spaces across the Middle East, integrating physical design, storytelling, and digital touchpoints. Designed experience flows and interactive environments for executive engagements and strategic client visits.',
  },
  {
    title: 'Digital Design Textbook',
    subtitle: 'Saudi High School Curriculum',
    category: 'Education',
    color: 'from-rose-900/40 to-accent/20',
    description:
      'Authored lessons for the digital design book used in the Saudi high school curriculum, covering essential topics such as 3D modeling, advertising, motion graphics, and digital photography. Led workshops for Ministry of Education employees and teachers.',
  },
]

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-start justify-center px-4 pt-10 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-[90vw] rounded-t-2xl"
        style={{
          backgroundColor: project.modalBg || (project.lightModal ? '#F5F0EA' : '#050505'),
          border: `1px solid ${project.modalBg ? 'rgba(0,0,0,0.08)' : project.lightModal ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Derive text colours: custom > lightModal > dark */}
        {(() => {
          const isLight = !!(project.modalBg || project.lightModal)
          const txtMain  = project.modalText || (isLight ? '#1c1917' : '#f5f5f4')
          const txtSub   = project.modalText ? project.modalText + 'aa' : (isLight ? '#57534e' : '#a8a29e')
          const txtMuted = project.modalText ? project.modalText + '88' : (isLight ? '#78716c' : '#78716c')
          const borderC  = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'

          return (
            <>
              {/* Close button */}
              <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
                <X size={20} />
              </button>

              {/* Hero image or gradient — full bleed */}
              {project.images ? (
                <img src={project.images[0]} alt={`${project.title} hero`} className="w-full object-cover rounded-t-2xl block" />
              ) : (
                <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center rounded-t-2xl`}>
                  <span className="text-white/40 text-sm uppercase tracking-widest">Images Coming Soon</span>
                </div>
              )}

              {/* Text content */}
              <div className="px-10 md:px-16 py-12">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: txtMuted }}>{project.category}</p>
                <h3 className="font-display text-3xl md:text-4xl font-semibold mb-1" style={{ color: txtMain }}>{project.title}</h3>
                {project.subtitle && <p className="text-sm mt-1" style={{ color: txtSub }}>{project.subtitle}</p>}

                {/* Brand Background — two column */}
                {project.brandBackground && (
                  <div className="mt-12 pt-10 flex flex-col md:flex-row gap-10 md:gap-16" style={{ borderTop: `1px solid ${borderC}` }}>
                    <div className="md:w-[38%] flex-shrink-0">
                      <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight" style={{ color: txtMain }}>
                        BACKGROUND
                      </h2>
                    </div>
                    <div className="md:w-[62%] space-y-4">
                      {project.brandBackground.split('\n\n').map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed" style={{ color: txtSub }}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brand Colour Palette */}
                {project.brandColors && (
                  <div className="mt-12 pt-10" style={{ borderTop: `1px solid ${borderC}` }}>
                    <p className="text-xs uppercase tracking-widest mb-6" style={{ color: txtMuted }}>Colour Palette</p>
                    <div className="flex gap-4 flex-wrap">
                      {project.brandColors.map((c) => (
                        <div key={c.hex} className="flex flex-col items-start gap-2">
                          <div className={`w-24 h-12 rounded-lg ${c.border ? 'border border-black/15' : ''}`} style={{ backgroundColor: c.hex }} />
                          <span className="text-xs font-mono" style={{ color: txtMuted }}>{c.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Remaining images — full bleed */}
              {project.images?.slice(1).map((src, i) => (
                <img key={i} src={src} alt={`${project.title} ${i + 2}`} className="w-full object-cover block" />
              ))}

              {/* PDF Viewer */}
              {project.pdf && (
                <div className="px-10 md:px-16 pb-12">
                  <div className="pt-10" style={{ borderTop: `1px solid ${borderC}` }}>
                    <p className="text-xs uppercase tracking-widest mb-4" style={{ color: txtMuted }}>Project PDF</p>
                    <div className="rounded-xl overflow-hidden" style={{ height: '80vh', border: `1px solid ${borderC}` }}>
                      <iframe src={`${project.pdf}#toolbar=1&navpanes=0&view=FitH`} className="w-full h-full" title={`${project.title} PDF`} />
                    </div>
                    <a href={project.pdf} target="_blank" rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                      style={{ color: txtMuted }}>
                      Open in new tab ↗
                    </a>
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

export default function Projects() {
  const [selected, setSelected] = useState(null)

  const openModal = (project) => {
    setSelected(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelected(null)
    document.body.style.overflow = ''
  }

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            Selected <span className="italic text-accent">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => openModal(project)}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer"
              style={{ boxShadow: '0 0 0 0 rgba(255,210,130,0)' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow =
                  '0 0 18px 4px rgba(255,195,100,0.22), 0 0 40px 8px rgba(255,160,60,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,210,130,0)'
              }}
            >
              {/* Image or gradient placeholder */}
              <div className={`aspect-[5/4] relative overflow-hidden ${project.image ? '' : `bg-gradient-to-br ${project.color}`}`}>
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Glass shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.0) 60%, rgba(255,220,150,0.08) 100%)',
                        backdropFilter: 'blur(0px)',
                      }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sand-500/40 text-xs uppercase tracking-widest">
                      Click to Explore
                    </span>
                  </div>
                )}
              </div>

              {/* Dark gradient bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sand-400 text-xs uppercase tracking-widest mb-1">
                  {project.category}
                </p>
                <h3 className="text-sand-50 text-base font-display font-semibold leading-snug">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-sand-400 text-xs mt-0.5">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
