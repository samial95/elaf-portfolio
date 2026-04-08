import { useEffect, useRef } from 'react'

const RECT_SIZE = 24
const LIFETIME  = 700
const MAX_DIST  = 8

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Don't run on touch/mobile — wastes CPU and heats the device
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let rects    = []
    let lastX    = -999, lastY = -999
    let raf      = null
    let idle     = false   // stop RAF when no rects remain

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMove = (e) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) return
      lastX = e.clientX
      lastY = e.clientY
      rects.push({ x: e.clientX - RECT_SIZE / 2, y: e.clientY - RECT_SIZE / 2, born: performance.now() })
      if (idle) { idle = false; raf = requestAnimationFrame(draw) }
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rects = rects.filter(r => now - r.born < LIFETIME)

      for (const r of rects) {
        const alpha = 1 - (now - r.born) / LIFETIME
        ctx.strokeStyle = `rgba(255,255,255,${(alpha * 0.45).toFixed(3)})`
        ctx.lineWidth   = 0.8
        ctx.strokeRect(r.x, r.y, RECT_SIZE, RECT_SIZE)
      }

      if (rects.length === 0) { idle = true; return }  // stop RAF when nothing to draw
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    // Don't start RAF until first movement
    idle = true

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',    resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
