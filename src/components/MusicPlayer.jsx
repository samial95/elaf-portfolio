import { useEffect, useRef, useState } from 'react'

// Shared hook — call once at the top level, pass state down
export function useMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const divRef = useRef(null)

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
          onReady: (e) => {
            setReady(true)
            e.target.setVolume(40)
            e.target.playVideo()
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
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [])

  const toggle = () => {
    if (!playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.seekTo(16, true)
      playerRef.current.playVideo()
    }
  }

  return { playing, ready, toggle, divRef }
}

// The wave bars visual — reusable in both navbar and mobile fixed button
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

// Mobile-only fixed bottom-right button
export function MobileWaveButton({ playing, toggle }) {
  return (
    <button
      onClick={toggle}
      title={playing ? 'Pause music' : 'Play music'}
      className="md:hidden"
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
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(192,114,120,0.6)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(192,114,120,0.25)'}
    >
      <WaveBars playing={playing} />
    </button>
  )
}

// Full music player — renders the hidden YT div + mobile button
export default function MusicPlayer({ playing, toggle, divRef }) {
  return (
    <>
      {/* Hidden YouTube player mount point */}
      <div
        ref={divRef}
        style={{ position: 'fixed', bottom: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none', zIndex: -1 }}
      />
      <MobileWaveButton playing={playing} toggle={toggle} />
    </>
  )
}
