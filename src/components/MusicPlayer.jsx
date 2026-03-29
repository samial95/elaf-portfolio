import { useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 40
const FADE_STEPS = 20
const FADE_INTERVAL_MS = 50

export function useMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)
  const divRef = useRef(null)
  const fadeRef = useRef(null)
  const unlockedRef = useRef(false)

  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }

  const fadeIn = () => {
    if (!playerRef.current) return
    clearFade()
    playerRef.current.unMute()
    playerRef.current.setVolume(0)
    playerRef.current.playVideo()
    let vol = 0
    fadeRef.current = setInterval(() => {
      vol = Math.min(vol + TARGET_VOLUME / FADE_STEPS, TARGET_VOLUME)
      playerRef.current?.setVolume(vol)
      if (vol >= TARGET_VOLUME) clearFade()
    }, FADE_INTERVAL_MS)
  }

  const fadeOut = () => {
    if (!playerRef.current) return
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
          mute: 1,        // muted autoplay is always allowed by browsers
          start: 0,
          controls: 0,
          loop: 1,
          playlist: 'n61ULEU7CO0',
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            // Start muted — this always works
            e.target.mute()
            e.target.seekTo(0, true)
            e.target.playVideo()

            // On the very first interaction, unmute and fade in
            const unlock = () => {
              if (unlockedRef.current) return
              unlockedRef.current = true
              fadeIn()
              UNLOCK_EVENTS.forEach(evt =>
                document.removeEventListener(evt, unlock)
              )
            }
            const UNLOCK_EVENTS = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove', 'pointerdown']
            UNLOCK_EVENTS.forEach(evt =>
              document.addEventListener(evt, unlock, { passive: true })
            )
          },
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
      unlockedRef.current = true
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
          0%   { filter: drop-shadow(0 0 2px rgba(192,114,120,0.4)); }
          40%  { filter: drop-shadow(0 0 8px rgba(192,114,120,1)) drop-shadow(0 0 16px rgba(192,114,120,0.6)); }
          55%  { filter: drop-shadow(0 0 5px rgba(192,114,120,0.7)); }
          100% { filter: drop-shadow(0 0 2px rgba(192,114,120,0.4)); }
        }
      `}</style>
      <span style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
        animation: playing ? 'rhythmGlow 0.55s ease-in-out infinite' : 'none',
        filter: playing ? undefined : 'drop-shadow(0 0 2px rgba(192,114,120,0.3))',
        transition: 'filter 0.5s',
      }}>
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
      </span>
    </>
  )
}

export default function MusicPlayer({ playing, toggle, divRef }) {
  return (
    <>
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
          padding: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <WaveBars playing={playing} />
      </button>
    </>
  )
}
