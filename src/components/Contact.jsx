import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50 mb-4">
            Let's <span className="italic text-accent">Connect</span>
          </h2>
          <p className="text-sand-400 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Let's create something beautiful together.
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
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">Email</p>
                <p className="text-sand-100">hello@elaf.design</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sand-500 text-sm">Location</p>
                <p className="text-sand-100">Available Worldwide</p>
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
              className="w-full px-6 py-3 bg-accent text-sand-50 font-medium rounded-xl hover:bg-accent-dark transition-colors flex items-center justify-center gap-2"
            >
              Send Message <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
