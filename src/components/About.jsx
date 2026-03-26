import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const mediaFeatures = [
  {
    name: 'The National',
    desc: 'Leading Middle East newspaper',
    url: 'https://www.thenationalnews.com/gulf-news/2023/03/08/saudi-women-leading-tech-in-the-kingdom/',
  },
  {
    name: 'AboutHer',
    desc: 'Platform highlighting influential women leaders',
    url: 'https://www.abouther.com/node/57241/people/leading-ladies/meet-forward-thinking-saudi-arab-women-pwc-middle-east-ksa#slide/1',
  },
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
          className="text-center mb-12"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            About <span className="italic text-accent">Elaf</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sand-300 text-lg md:text-xl leading-relaxed mb-6">
            An experience maker by profession and a designer by heart.
          </p>
          <p className="text-sand-400 leading-relaxed mb-6">
            Elaf brings 7+ years of experience across government institutions, consulting,
            innovation labs, startups, and digital agencies. She specialises in immersive
            experience design, executive engagements, and creative technology storytelling.
            At PwC, she led 65+ client tours and executive engagements — combining GenAI,
            3D design, and AR/VR to simplify complex ideas into interactive demonstrations.
          </p>
          <p className="text-sand-400 leading-relaxed mb-10">
            Recognised in leading regional media for contributions to emerging technology
            innovation and the growing role of women in the technology sector in Saudi Arabia.
          </p>

          {/* Media Features */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {mediaFeatures.map((feature) => (
              <a
                key={feature.name}
                href={feature.url}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-sand-800/50 text-sand-300 hover:border-accent/40 hover:text-accent transition-colors group"
              >
                <span className="text-sm font-medium">
                  Featured in{' '}
                  <span className="text-accent">{feature.name}</span>
                </span>
                <ExternalLink
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
