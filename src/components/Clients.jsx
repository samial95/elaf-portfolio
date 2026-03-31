import { motion } from 'framer-motion'

const clients = [
  'MOC',
  'ZAN',
  'Saudi Awwal Bank',
  'Qasr Alawani',
  'PNU',
  'SBC TV',
  'KAPSARC',
  'Seven',
  'Ministry of Education',
]

export default function Clients() {
  return (
    <section id="clients" className="py-24 px-6 bg-sand-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-white text-sm uppercase tracking-[0.3em] mb-4">
            Trusted By
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            <span className="italic text-white">Clients</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-center justify-center p-6 rounded-2xl bg-sand-900/40 border border-sand-800/40 hover:border-accent/30 transition-all duration-300"
            >
              <span className="text-sand-400 text-sm font-medium text-center group-hover:text-white transition-colors">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
