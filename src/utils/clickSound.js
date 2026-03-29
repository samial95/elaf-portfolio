let audio = null

export function playClick() {
  if (!audio) {
    audio = new Audio('/click.m4a')
    audio.volume = 0.35
  }
  audio.currentTime = 0
  audio.play().catch(() => {})
}
