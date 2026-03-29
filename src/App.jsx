import { useState, useEffect, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'

import Room from './components/Room'
import Lighting from './components/Lighting'
import DustParticles from './components/DustParticles'
import CameraController from './components/CameraController'
import Entrance from './components/Entrance'
import Workbench from './components/Workbench'
import DisplayShelf from './components/DisplayShelf'
import ToolWall from './components/ToolWall'
import Pinboard from './components/Pinboard'
import BackDoor from './components/BackDoor'
import Navigation from './components/Navigation'
import HtmlOverlays from './components/HtmlOverlays'
import CaseStudyPanel from './components/CaseStudyPanel'

const TOTAL_SECTIONS = 6

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [targetSection, setTargetSection] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const canvasRef = useRef(null)
  const scrollAccumulator = useRef(0)

  // Scroll handler — accumulate wheel events to drive camera
  useEffect(() => {
    const handleWheel = (e) => {
      if (caseStudyOpen) return
      e.preventDefault()

      scrollAccumulator.current += e.deltaY * 0.0003
      scrollAccumulator.current = Math.max(0, Math.min(1, scrollAccumulator.current))

      setScrollProgress(scrollAccumulator.current)
      setTargetSection(null) // Clear any nav-click target

      // Determine active section
      const sectionIndex = Math.round(scrollAccumulator.current * (TOTAL_SECTIONS - 1))
      setActiveSection(sectionIndex)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [caseStudyOpen])

  // Touch support
  useEffect(() => {
    let lastTouchY = 0
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (caseStudyOpen) return
      e.preventDefault()
      const delta = lastTouchY - e.touches[0].clientY
      lastTouchY = e.touches[0].clientY

      scrollAccumulator.current += delta * 0.0008
      scrollAccumulator.current = Math.max(0, Math.min(1, scrollAccumulator.current))

      setScrollProgress(scrollAccumulator.current)
      setTargetSection(null)

      const sectionIndex = Math.round(scrollAccumulator.current * (TOTAL_SECTIONS - 1))
      setActiveSection(sectionIndex)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [caseStudyOpen])

  // Navigation dot click — snap to section
  const handleSectionClick = useCallback((sectionId) => {
    const progress = sectionId / (TOTAL_SECTIONS - 1)
    setTargetSection(sectionId)
    setActiveSection(sectionId)
    // Smoothly update the accumulator too
    gsap.to(scrollAccumulator, {
      current: progress,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setScrollProgress(scrollAccumulator.current)
      },
    })
  }, [])

  // Project click handler
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project)
    setCaseStudyOpen(true)
    // Fade canvas
    if (canvasRef.current) {
      gsap.to(canvasRef.current, { opacity: 0.2, duration: 0.4, ease: 'power2.out' })
    }
  }, [])

  // Close case study
  const handleCloseCaseStudy = useCallback(() => {
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setSelectedProject(null)
          setCaseStudyOpen(false)
        },
      })
    }
  }, [])

  return (
    <div className="w-full h-full relative" style={{ background: '#0d0d0d' }}>
      {/* 3D Canvas — persistent, full screen */}
      <div ref={canvasRef} className="fixed inset-0 z-10">
        <Canvas
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          camera={{ fov: 60, near: 0.1, far: 100 }}
        >
          <color attach="background" args={['#0d0d0d']} />
          <fog attach="fog" args={['#0d0d0d', 8, 22]} />

          <CameraController scrollProgress={scrollProgress} targetSection={targetSection} />
          <Lighting />
          <Room />
          <DustParticles count={500} />

          {/* Sections */}
          <Entrance />
          <Workbench />
          <DisplayShelf onProjectClick={handleProjectClick} />
          <ToolWall />
          <Pinboard />
          <BackDoor />
        </Canvas>
      </div>

      {/* HTML Overlays */}
      <HtmlOverlays activeSection={activeSection} caseStudyOpen={caseStudyOpen} />

      {/* Navigation dots */}
      <Navigation activeSection={activeSection} onSectionClick={handleSectionClick} />

      {/* Case Study Panel */}
      <CaseStudyPanel project={selectedProject} onClose={handleCloseCaseStudy} />

      {/* Elaf nameplate text overlay for entrance */}
      {activeSection === 0 && !caseStudyOpen && (
        <div
          className="fixed z-20 transition-opacity duration-1000"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: activeSection === 0 ? 1 : 0,
          }}
        >
          <h1
            className="text-6xl font-bold tracking-wide"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#f5c842',
              textShadow: '0 0 60px rgba(245, 200, 66, 0.3), 0 0 120px rgba(245, 200, 66, 0.1)',
            }}
          >
            Elaf
          </h1>
          <p
            className="text-center text-sm tracking-[0.3em] uppercase mt-3"
            style={{ color: 'rgba(184, 134, 11, 0.6)', fontFamily: 'Inter, sans-serif' }}
          >
            The Workshop
          </p>
        </div>
      )}
    </div>
  )
}
