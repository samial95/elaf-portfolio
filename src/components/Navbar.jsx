import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { playClick } from '../utils/clickSound'

const links = ['Projects', 'About', 'Timeline', 'Toolkit', 'Contact']

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
          className="font-display text-base md:text-lg font-semibold text-sand-100 tracking-widest uppercase nav-glow"
          style={glowStyle}
        >
          Portfolio
        </a>

        {/* Right — links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onMouseEnter={playClick}
              onClick={playClick}
              className="text-sand-300 text-xs uppercase tracking-[0.18em] nav-glow"
              style={glowStyle}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-sand-300 hover:text-accent transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Bottom line — spans from P of Portfolio to T of Contact */}
      <div className="max-w-7xl mx-auto px-8">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)' }} />
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
          color: #ffffff !important;
          opacity: 0.7;
        }
      `}</style>
    </nav>
  )
}
