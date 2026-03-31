import { useEffect, useRef, useState } from 'react'

const VIDEO_ID = 'EeRfSNx5RhE'

// Bar heights (min → max) for each of the 4 bars
const BARS = [
  { delay: '0ms',   minH: 3, maxH: 14 },
  { delay: '180ms', minH: 3, maxH: 20 },
  { delay: '90ms',  minH: 3, maxH: 10 },
  { delay: '240ms', minH: 3, maxH: 17 },
]

export default function MusicPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [ready, setReady]       = useState(false)
  const [blocked, setBlocked]   = useState(false) // autoplay was blocked
  const playerRef               = useRef(null)
  const mountRef                = useRef(null)

  useEffect(() => {
    // Load the YouTube IFrame API script once
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady(e) {
            setReady(true)
            e.target.setVolume(35)
            e.target.playVideo()
          },
          onStateChange(e) {
            const s = e.data
            if (s === window.YT.PlayerState.PLAYING) {
              setPlaying(true)
              setBlocked(false)
            } else if (
              s === window.YT.PlayerState.PAUSED ||
              s === window.YT.PlayerState.ENDED
            ) {
              setPlaying(false)
            } else if (s === -1) {
              // unstarted → autoplay likely blocked by browser
              setBlocked(true)
            }
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
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [])

  const toggle = () => {
    if (!playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
      setBlocked(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
      }}
    >
      {/* Hidden YouTube player container */}
      <div
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div ref={mountRef} />
      </div>

      {/* Visible widget */}
      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '3px',
          height: '20px',
          padding: '0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          opacity: playing ? 1 : 0.45,
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = playing ? '1' : '0.45'}
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
