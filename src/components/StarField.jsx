import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth
    let H = window.innerHeight
    let mouse = { x: W / 2, y: H / 2 }
    let animId

    canvas.width = W
    canvas.height = H

    // Generate stars
    const STAR_COUNT = 160
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.018 + 0.004, // parallax depth
    }))

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const dx = (mouse.x - W / 2)
      const dy = (mouse.y - H / 2)

      stars.forEach((s) => {
        const ox = dx * s.speed
        const oy = dy * s.speed
        const px = ((s.x + ox) % W + W) % W
        const py = ((s.y + oy) % H + H) % H

        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,220,225,${s.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
