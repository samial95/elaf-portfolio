import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-900/20 via-sand-950 to-sand-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-4xl"
      >
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-6">
          Design Portfolio
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-sand-50 leading-tight mb-6">
          Creative<br />
          <span className="italic text-accent">Design</span> Studio
        </h1>
        <p className="text-sand-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          Crafting meaningful digital experiences through thoughtful design,
          branding, and visual storytelling.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-accent text-sand-50 font-medium rounded-full hover:bg-accent-dark transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-sand-700 text-sand-300 rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 text-sand-500 hover:text-accent transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
