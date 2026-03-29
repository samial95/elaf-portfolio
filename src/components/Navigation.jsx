import { useState, useEffect } from 'react'

const sections = [
  { id: 0, label: 'Entrance' },
  { id: 1, label: 'Workbench' },
  { id: 2, label: 'Projects' },
  { id: 3, label: 'Skills' },
  { id: 4, label: 'Timeline' },
  { id: 5, label: 'Contact' },
]

export default function Navigation({ activeSection, onSectionClick }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <nav className="fixed top-1/2 right-6 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        const isHovered = hoveredId === section.id
        return (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex items-center justify-end gap-3 cursor-pointer bg-transparent border-none p-0"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label tooltip */}
            <span
              className="text-xs tracking-wider uppercase transition-all duration-300"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: isActive ? '#f5c842' : '#888',
                opacity: isHovered ? 1 : 0,
                transform: `translateX(${isHovered ? 0 : 8}px)`,
              }}
            >
              {section.label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                backgroundColor: isActive ? '#f5c842' : 'transparent',
                border: `1.5px solid ${isActive ? '#f5c842' : 'rgba(184, 134, 11, 0.5)'}`,
                boxShadow: isActive ? '0 0 8px rgba(245, 200, 66, 0.5)' : 'none',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
