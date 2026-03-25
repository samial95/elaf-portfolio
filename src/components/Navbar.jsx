import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Menu, X } from 'lucide-react'

const links = ['Projects', 'About', 'Timeline', 'Toolkit', 'Clients', 'Contact']

const glowStyle = {
  transition: 'color 0.2s ease, text-shadow 0.2s ease',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Left — name */}
        <a
          href="#"
          className="font-display text-sm font-semibold text-sand-100 tracking-widest uppercase nav-glow"
          style={glowStyle}
        >
          Elaf Al salman
        </a>

        {/* Centre — links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sand-300 text-xs uppercase tracking-[0.18em] nav-glow"
              style={glowStyle}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — globe icon */}
        <button
          className="hidden md:flex items-center justify-center text-sand-300 nav-glow"
          style={glowStyle}
          title="Language"
        >
          <Globe size={18} strokeWidth={1.5} />
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-sand-300 hover:text-accent transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-sand-300 text-xs uppercase tracking-widest nav-glow"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow-on-hover global style */}
      <style>{`
        .nav-glow:hover {
          color: #FFE8C8 !important;
          text-shadow:
            0 0 6px rgba(255, 220, 160, 1),
            0 0 16px rgba(255, 195, 110, 0.85),
            0 0 35px rgba(240, 160, 60, 0.5),
            0 0 60px rgba(210, 120, 20, 0.25);
          filter: drop-shadow(0 0 5px rgba(255, 210, 130, 0.75));
        }
      `}</style>
    </nav>
  )
}
