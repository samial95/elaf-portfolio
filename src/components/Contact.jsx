import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react'

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Elafabduallh@gmail.com',
    href: 'mailto:Elafabduallh@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+966 554 404 383',
    href: 'tel:+966554404383',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Riyadh, Saudi Arabia',
    href: null,
  },
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    value: 'Elaf Alsalman',
    href: 'https://www.linkedin.com/in/elaf-alsalman-%D8%A5%D9%8A%D9%84%D8%A7%D9%81-%D8%A2%D9%84-%D8%B3%D9%84%D9%85%D8%A7%D9%86-004b78197/',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2
            className="font-display font-semibold text-sand-50 uppercase"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', letterSpacing: '0.06em' }}
          >
            Contact
          </h2>
        </motion.div>

        {/* Details grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10"
        >
          {details.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex flex-col gap-3">
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: '0.82rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                >
                  {value}
                </a>
              ) : (
                <p style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)' }}>
                  {value}
                </p>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
