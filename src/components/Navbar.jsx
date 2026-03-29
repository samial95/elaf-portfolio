import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { WaveBars } from './MusicPlayer'
import { playClick } from '../utils/clickSound'

const links = ['Projects', 'About', 'Timeline', 'Toolkit', 'Contact']

const glowStyle = {
  transition: 'color 0.2s ease, text-shadow 0.2s ease',
}

export default function Navbar({ musicPlaying, musicToggle }) {
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

        {/* Centre — links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
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

        {/* Right — wave music button (desktop only) */}
        <button
          onClick={() => { playClick(); musicToggle() }}
          onMouseEnter={playClick}
          title={musicPlaying ? 'Pause music' : 'Play music'}
          className="hidden md:flex items-center"
          style={{
            gap: '3px',
            alignItems: 'flex-end',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '6px',
            transition: 'opacity 0.2s',
            opacity: 0.7,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
        >
          <WaveBars playing={musicPlaying} />
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
          color: #e8a0a5 !important;
          text-shadow:
            0 0 6px rgba(192, 114, 120, 1),
            0 0 16px rgba(192, 114, 120, 0.85),
            0 0 35px rgba(192, 114, 120, 0.5),
            0 0 60px rgba(192, 114, 120, 0.25);
          filter: drop-shadow(0 0 5px rgba(192, 114, 120, 0.75));
        }
      `}</style>
    </nav>
  )
}
