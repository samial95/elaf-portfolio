import { useEffect, useRef, useState } from 'react'

const VIDEO_ID = 'EeRfSNx5RhE'

const BARS = [
  { delay: '0ms',   maxH: 14 },
  { delay: '180ms', maxH: 20 },
  { delay: '90ms',  maxH: 10 },
  { delay: '240ms', maxH: 17 },
]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const playerRef             = useRef(null)
  const mountRef              = useRef(null)
  const unmutedRef            = useRef(false) // has the user triggered unmute yet

  useEffect(() => {
    // Load YouTube IFrame API once
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
          mute:     1,   // muted autoplay always allowed by Chrome
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

    // Chrome requires a real user gesture to allow audio.
    // On first interaction (scroll / click / key) we unmute once.
    const unmute = () => {
      if (unmutedRef.current || !playerRef.current) return
      unmutedRef.current = true
      playerRef.current.unMute()
      playerRef.current.setVolume(40)
      document.removeEventListener('click',   unmute)
      document.removeEventListener('scroll',  unmute)
      document.removeEventListener('keydown', unmute)
      document.removeEventListener('touchstart', unmute)
    }

    document.addEventListener('click',      unmute, { once: true, passive: true })
    document.addEventListener('scroll',     unmute, { once: true, passive: true })
    document.addEventListener('keydown',    unmute, { once: true, passive: true })
    document.addEventListener('touchstart', unmute, { once: true, passive: true })

    return () => {
      document.removeEventListener('click',      unmute)
      document.removeEventListener('scroll',     unmute)
      document.removeEventListener('keydown',    unmute)
      document.removeEventListener('touchstart', unmute)
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [])

  const toggle = () => {
    if (!playerRef.current) return
    // Also make sure we unmute if the user hasn't yet
    if (!unmutedRef.current) {
      unmutedRef.current = true
      playerRef.current.unMute()
      playerRef.current.setVolume(40)
    }
    if (playing) playerRef.current.pauseVideo()
    else         playerRef.current.playVideo()
  }

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999 }}>
      {/* Hidden YouTube mount */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0 }}>
        <div ref={mountRef} />
      </div>

      {/* Bars button */}
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
