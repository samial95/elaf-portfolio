import { useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 40
const FADE_STEPS = 20
const FADE_INTERVAL_MS = 50 // 50ms × 20 = 1s fade

export function useMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)
  const divRef = useRef(null)
  const fadeRef = useRef(null)

  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }

  const fadeIn = () => {
    clearFade()
    playerRef.current.setVolume(0)
    playerRef.current.seekTo(16, true)
    playerRef.current.playVideo()
    let vol = 0
    fadeRef.current = setInterval(() => {
      vol = Math.min(vol + TARGET_VOLUME / FADE_STEPS, TARGET_VOLUME)
      playerRef.current?.setVolume(vol)
      if (vol >= TARGET_VOLUME) clearFade()
    }, FADE_INTERVAL_MS)
  }

  const fadeOut = () => {
    clearFade()
    let vol = TARGET_VOLUME
    fadeRef.current = setInterval(() => {
      vol = Math.max(vol - TARGET_VOLUME / FADE_STEPS, 0)
      playerRef.current?.setVolume(vol)
      if (vol <= 0) {
        clearFade()
        playerRef.current?.pauseVideo()
      }
    }, FADE_INTERVAL_MS)
  }

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(divRef.current, {
        height: '1',
        width: '1',
        videoId: 'n61ULEU7CO0',
        playerVars: {
          autoplay: 1,
          start: 16,
          controls: 0,
          loop: 1,
          playlist: 'n61ULEU7CO0',
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => { fadeIn() },
          onStateChange: (e) => {
            setPlaying(e.data === window.YT.PlayerState.PLAYING)
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
    if (playing) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return { playing, toggle, divRef }
}

export function WaveBars({ playing }) {
  const bars = [
    { delay: '0s',    maxH: 18 },
    { delay: '0.15s', maxH: 24 },
    { delay: '0.3s',  maxH: 14 },
    { delay: '0.1s',  maxH: 20 },
    { delay: '0.25s', maxH: 16 },
  ]

  return (
    <>
      <style>{`
        @keyframes waveBar {
          0%   { height: 4px; }
          100% { height: var(--wave-max-h, 20px); }
        }
        @keyframes rhythmGlow {
          0%   { box-shadow: 0 0 8px 2px rgba(192,114,120,0.25), 0 0 0 1px rgba(192,114,120,0.2); }
          40%  { box-shadow: 0 0 22px 8px rgba(192,114,120,0.65), 0 0 40px 16px rgba(192,114,120,0.25), 0 0 0 1px rgba(192,114,120,0.5); }
          55%  { box-shadow: 0 0 14px 4px rgba(192,114,120,0.4),  0 0 24px 8px rgba(192,114,120,0.15), 0 0 0 1px rgba(192,114,120,0.35); }
          100% { box-shadow: 0 0 8px 2px rgba(192,114,120,0.25), 0 0 0 1px rgba(192,114,120,0.2); }
        }
      `}</style>
      {bars.map((bar, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: '3px',
            borderRadius: '3px',
            backgroundColor: '#c07278',
            height: playing ? `${bar.maxH}px` : '4px',
            animation: playing
              ? `waveBar ${0.7 + i * 0.07}s ease-in-out ${bar.delay} infinite alternate`
              : 'none',
            transition: 'height 0.3s ease',
          }}
        />
      ))}
    </>
  )
}

export default function MusicPlayer({ playing, toggle, divRef }) {
  return (
    <>
      {/* Hidden YouTube player mount point */}
      <div
        ref={divRef}
        style={{ position: 'fixed', bottom: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none', zIndex: -1 }}
      />

      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '12px 14px',
          borderRadius: '999px',
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(192,114,120,0.25)',
          cursor: 'pointer',
          outline: 'none',
          // rhythm glow when playing, subtle static glow when paused
          boxShadow: playing
            ? undefined
            : '0 0 6px 1px rgba(192,114,120,0.12)',
          animation: playing ? 'rhythmGlow 0.55s ease-in-out infinite' : 'none',
          transition: 'border-color 0.3s, box-shadow 0.5s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(192,114,120,0.7)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(192,114,120,0.25)'
        }}
      >
        <WaveBars playing={playing} />
      </button>
    </>
  )
}
