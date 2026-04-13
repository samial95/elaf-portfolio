import { useEffect, useRef, useState } from 'react'

export default function CursorTrail() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Don't run on touch/mobile
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf = null

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1

      dot.style.left  = mx + 'px'
      dot.style.top   = my + 'px'
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Expand ring on hover using event delegation
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        ring.classList.add('hovering')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        ring.classList.remove('hovering')
      }
    }
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
