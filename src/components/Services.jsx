import { motion } from 'framer-motion'
import { PenTool, Monitor, Camera, BookOpen } from 'lucide-react'

const services = [
  {
    icon: PenTool,
    title: 'Brand Design',
    description: 'Logo design, visual identity systems, brand guidelines, and collateral design.',
  },
  {
    icon: Monitor,
    title: 'Web Design',
    description: 'Responsive website design, landing pages, and interactive web experiences.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Product photography, lifestyle shoots, and visual content creation.',
  },
  {
    icon: BookOpen,
    title: 'Print Design',
    description: 'Editorial layout, packaging design, and marketing materials.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-sand-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-white text-sm uppercase tracking-[0.3em] mb-4">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            What I <span className="italic text-white">Offer</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-sand-950/60 border border-sand-800/50 hover:border-accent/30 transition-colors text-center group"
            >
              <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-white mb-5 group-hover:bg-accent/20 transition-colors">
                <Icon size={24} />
              </div>
              <h3 className="text-sand-100 font-display text-lg font-semibold mb-3">{title}</h3>
              <p className="text-sand-500 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
