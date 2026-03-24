import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Brand Reimagined',
    category: 'Branding',
    description: 'A complete brand identity overhaul for a modern lifestyle company.',
    color: 'from-amber-900/40 to-orange-900/20',
  },
  {
    title: 'Digital Experience',
    category: 'UI/UX Design',
    description: 'An immersive web experience for an art gallery exhibition.',
    color: 'from-emerald-900/40 to-teal-900/20',
  },
  {
    title: 'Visual Identity',
    category: 'Logo Design',
    description: 'Minimal and timeless logo design for a luxury fashion brand.',
    color: 'from-violet-900/40 to-purple-900/20',
  },
  {
    title: 'App Interface',
    category: 'Mobile Design',
    description: 'Clean and intuitive mobile app design for a wellness platform.',
    color: 'from-rose-900/40 to-pink-900/20',
  },
]

export default function Projects() {
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
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            Selected <span className="italic text-accent">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-sand-800/50 hover:border-accent/30 transition-all duration-300"
            >
              {/* Gradient placeholder for project image */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <span className="text-sand-500/50 text-sm uppercase tracking-widest">
                  Project Image
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sand-950 via-sand-950/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-accent text-xs uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h3 className="text-sand-50 text-xl font-display font-semibold mb-2 flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-accent"
                  />
                </h3>
                <p className="text-sand-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
