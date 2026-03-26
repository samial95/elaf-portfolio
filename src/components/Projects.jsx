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
        className="relative w-full max-w-[90vw] bg-[#050505] border border-white/5 rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-sand-300 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X size={20} />
        </button>

        {/* First image or gradient placeholder */}
        {project.images ? (
          <img
            src={project.images[0]}
            alt={`${project.title} 1`}
            className="w-full object-cover rounded-t-2xl"
          />
        ) : (
          <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center rounded-t-2xl`}>
            <span className="text-sand-400/60 text-sm uppercase tracking-widest">Images Coming Soon</span>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <p className="text-sand-400 text-xs uppercase tracking-widest mb-2">
            {project.category}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-sand-50 mb-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sand-400 text-sm mb-4">{project.subtitle}</p>
          )}

          {/* Brand Background text */}
          {project.brandBackground && (
            <div className="mt-10 flex flex-col md:flex-row gap-8 md:gap-12 border-t border-white/5 pt-10">
              <div className="md:w-2/5 flex-shrink-0">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sand-50 uppercase leading-none tracking-tight">
                  BACKGROUND
                </h2>
              </div>
              <div className="md:w-3/5">
                {project.brandBackground.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sand-300 text-sm leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Second image */}
          {project.images?.[1] && (
            <div className="mt-6">
              <img
                src={project.images[1]}
                alt={`${project.title} 2`}
                className="w-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* PDF Viewer */}
          {project.pdf && (
            <div className="mt-8">
              <p className="text-sand-400 text-xs uppercase tracking-widest mb-3">Project PDF</p>
              <div className="rounded-xl overflow-hidden border border-sand-700/50" style={{ height: '70vh' }}>
                <iframe
                  src={`${project.pdf}#toolbar=1&navpanes=0&view=FitH`}
                  className="w-full h-full"
                  title={`${project.title} PDF`}
                />
              </div>
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-sand-400 hover:text-sand-100 uppercase tracking-widest transition-colors"
              >
                Open in new tab ↗
              </a>
            </div>
          )}
        </div>
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
