import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react'
import { playClick } from '../utils/clickSound'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#000000" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-white text-sm uppercase tracking-[0.3em] mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50 mb-4">
            Let's <span className="italic text-white accent-glow">Connect</span>
          </h2>
          <p className="text-sand-400 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-white icon-glow">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">Email</p>
                <a
                  href="mailto:Elafabduallh@gmail.com"
                  className="text-sand-100 hover:text-white transition-colors"
                >
                  Elafabduallh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-white icon-glow">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">Phone</p>
                <a
                  href="tel:+966554404383"
                  className="text-sand-100 hover:text-white transition-colors"
                >
                  +966 554 4043 83
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-white icon-glow">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">Location</p>
                <p className="text-sand-100">Riyadh, Saudi Arabia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-white icon-glow">
                <ExternalLink size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/elaf-alsalman-%D8%A5%D9%8A%D9%84%D8%A7%D9%81-%D8%A2%D9%84-%D8%B3%D9%84%D9%85%D8%A7%D9%86-004b78197/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand-100 hover:text-white transition-colors"
                >
                  Elaf Alsalman
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-sand-900/60 border border-sand-800/50 text-sand-100 placeholder-sand-600 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-sand-900/60 border border-sand-800/50 text-sand-100 placeholder-sand-600 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <textarea
              placeholder="Tell me about your project..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-sand-900/60 border border-sand-800/50 text-sand-100 placeholder-sand-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
            <button
              type="submit"
              onMouseEnter={playClick}
              onClick={playClick}
              className="w-full px-6 py-3 bg-sand-100 text-sand-950 font-medium rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Send Message <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
