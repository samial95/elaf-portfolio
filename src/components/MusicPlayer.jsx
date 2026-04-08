import { useEffect, useRef, useState } from 'react'

const VIDEO_ID   = 'EeRfSNx5RhE'
const TARGET_VOL = 50
const FADE_MS    = 1200  // fade duration in ms
const TICK_MS    = 30    // how often we step volume

const BARS = [
  { delay: '0ms',   maxH: 14 },
  { delay: '180ms', maxH: 20 },
  { delay: '90ms',  maxH: 10 },
  { delay: '240ms', maxH: 17 },
]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const playerRef   = useRef(null)
  const mountRef    = useRef(null)
  const unmutedRef  = useRef(false)
  const fadeRef     = useRef(null)  // holds the setInterval id

  const clearFade = () => {
    if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null }
  }

  const fadeIn = () => {
    if (!playerRef.current) return
    clearFade()
    let vol = 0
    playerRef.current.setVolume(0)
    playerRef.current.unMute()
    playerRef.current.playVideo()
    const steps = FADE_MS / TICK_MS
    const step  = TARGET_VOL / steps
    fadeRef.current = setInterval(() => {
      vol = Math.min(vol + step, TARGET_VOL)
      playerRef.current?.setVolume(Math.round(vol))
      if (vol >= TARGET_VOL) clearFade()
    }, TICK_MS)
  }

  const fadeOut = (cb) => {
    if (!playerRef.current) return
    clearFade()
    let vol = playerRef.current.getVolume?.() ?? TARGET_VOL
    const steps = FADE_MS / TICK_MS
    const step  = vol / steps
    fadeRef.current = setInterval(() => {
      vol = Math.max(vol - step, 0)
      playerRef.current?.setVolume(Math.round(vol))
      if (vol <= 0) {
        clearFade()
        playerRef.current?.pauseVideo()
        cb?.()
      }
    }, TICK_MS)
  }

  useEffect(() => {
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script')
      tag.id  = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute:     1,
          loop:     1,
          playlist: VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady(e) {
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange(e) {
            const s = e.data
            if (s === window.YT.PlayerState.PLAYING) setPlaying(true)
            else if (s === window.YT.PlayerState.PAUSED || s === window.YT.PlayerState.ENDED) setPlaying(false)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    const unmute = () => {
      if (unmutedRef.current || !playerRef.current) return
      unmutedRef.current = true
      fadeIn()
      document.removeEventListener('click',      unmute)
      document.removeEventListener('scroll',     unmute)
      document.removeEventListener('keydown',    unmute)
      document.removeEventListener('touchstart', unmute)
    }

    document.addEventListener('click',      unmute, { once: true, passive: true })
    document.addEventListener('scroll',     unmute, { once: true, passive: true })
    document.addEventListener('keydown',    unmute, { once: true, passive: true })
    document.addEventListener('touchstart', unmute, { once: true, passive: true })

    return () => {
      clearFade()
      document.removeEventListener('click',      unmute)
      document.removeEventListener('scroll',     unmute)
      document.removeEventListener('keydown',    unmute)
      document.removeEventListener('touchstart', unmute)
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [])

  const toggle = () => {
    if (!playerRef.current) return
    if (!unmutedRef.current) { unmutedRef.current = true }

    if (playing) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999 }}>
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0 }}>
        <div ref={mountRef} />
      </div>

      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '3px',
          height: '20px',
          padding: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          opacity: playing ? 1 : 0.45,
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = playing ? '1' : '0.45')}
      >
        {BARS.map((bar, i) => (
          <span
            key={i}
            className={playing ? 'music-bar' : ''}
            style={{
              display: 'block',
              width: '3px',
              height: playing ? undefined : '3px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.9)',
              animationDelay: bar.delay,
              animationDuration: `${600 + i * 80}ms`,
              '--bar-max': `${bar.maxH}px`,
            }}
          />
        ))}
      </button>
    </div>
  )
}
