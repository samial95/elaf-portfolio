import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Spline background — full bleed, no overlay so colours stay vibrant */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://my.spline.design/retrofuturismbganimation-pdLCHr9NlmXDVppUE9iMHRS1/"
          allow="autoplay"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="Spline Background"
        />
      </div>

      {/* Cover Spline watermark in bottom-right */}
      <div className="absolute bottom-0 right-0 w-52 h-14 z-20 bg-[#0a0a0a]" />

      {/* Full-width container matching navbar's max-w-7xl mx-auto px-8 */}
      <div className="relative z-10 min-h-screen w-full flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto px-8">
      <div className="max-w-xl pl-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-sand-50 leading-tight mb-3 whitespace-nowrap uppercase"
          >
            Elaf Al Salman
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-accent text-xs md:text-sm uppercase tracking-[0.2em] mb-8"
          >
            Creative Designer &amp; Experience Maker
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-row items-center gap-3"
          >
            {/* Glow button — black bg, accent glow on hover */}
            <a
              href="#projects"
              className="glow-btn px-5 py-2 text-xs md:text-sm font-medium rounded-full text-sand-50 transition-all duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="glow-btn px-5 py-2 text-xs md:text-sm font-medium rounded-full text-sand-50 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
      </div>
      </div>

      {/* Scroll arrow */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-sand-300 hover:text-accent transition-colors animate-bounce"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
