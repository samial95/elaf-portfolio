import { motion } from 'framer-motion'
import { Palette, Layers, Sparkles } from 'lucide-react'

const highlights = [
  { icon: Palette, label: 'Brand Identity', desc: 'Crafting unique visual identities that resonate' },
  { icon: Layers, label: 'UI/UX Design', desc: 'User-centered interfaces that feel intuitive' },
  { icon: Sparkles, label: 'Creative Direction', desc: 'Bringing bold visions to life' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Text */}
          <div>
            <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50 mb-6">
              Designing with <span className="italic text-accent">purpose</span>
            </h2>
            <p className="text-sand-400 leading-relaxed mb-4">
              I'm a designer passionate about creating beautiful, functional designs
              that tell stories and solve problems. With an eye for detail and a love
              for clean aesthetics, I bring ideas to life through thoughtful design.
            </p>
            <p className="text-sand-400 leading-relaxed">
              Every project is an opportunity to push creative boundaries while
              maintaining elegance and usability. I believe great design is invisible —
              it just works.
            </p>
          </div>

          {/* Right - Highlights */}
          <div className="space-y-6">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-sand-900/40 border border-sand-800/50 hover:border-accent/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-sand-100 font-medium mb-1">{label}</h3>
                  <p className="text-sand-500 text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
