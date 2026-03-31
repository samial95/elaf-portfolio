import { Globe, Aperture, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sand-600 text-sm">
          &copy; {new Date().getFullYear()} Elaf. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sand-500 hover:text-white transition-colors">
            <Globe size={18} />
          </a>
          <a href="#" className="text-sand-500 hover:text-white transition-colors">
            <Aperture size={18} />
          </a>
          <a href="#" className="text-sand-500 hover:text-white transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
