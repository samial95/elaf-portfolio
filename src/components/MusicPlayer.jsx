import { useEffect, useRef, useState } from 'react'

const VIDEO_ID   = 'EeRfSNx5RhE'
const TARGET_VOL = 50
const FADE_MS    = 1200
const TICK_MS    = 30

const BARS = [
  { delay: '0ms',   maxH: 14 },
  { delay: '180ms', maxH: 20 },
  { delay: '90ms',  maxH: 10 },
  { delay: '240ms', maxH: 17 },
]

export default function MusicPlayer() {
  const [playing, setPlaying]           = useState(false)
  const [hasBeenPressed, setHasBeenPressed] = useState(false)
  const playerRef  = useRef(null)
  const mountRef   = useRef(null)
  const fadeRef    = useRef(null)

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
          autoplay: 0,
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

    return () => {
      clearFade()
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [])

  const toggle = () => {
    if (!playerRef.current) return
    if (!hasBeenPressed) setHasBeenPressed(true)
    if (playing) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return (
    <div data-music-player style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999 }}>
      {/* Hidden YouTube mount */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0 }}>
        <div ref={mountRef} />
      </div>

      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '9px 14px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '3px',
          cursor: 'pointer',
          opacity: playing ? 1 : 0.7,
          transition: 'opacity 0.3s ease, background 0.3s ease',
          animation: !hasBeenPressed ? 'music-btn-pulse 2.4s ease-in-out infinite' : 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = playing ? '1' : '0.7')}
      >
        {/* Label */}
        <span style={{
          fontSize: '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 400,
        }}>
          {playing ? 'Pause' : 'Play & Enjoy'}
        </span>

        {/* Equalizer bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '20px' }}>
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
        </div>
      </button>
    </div>
  )
}
