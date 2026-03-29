import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.6, 9),    // Section 01: Entrance
  new THREE.Vector3(0, 1.6, 5),    // Section 02: Workbench
  new THREE.Vector3(0, 1.6, 0),    // Section 03: Display shelf
  new THREE.Vector3(0, 1.6, -4),   // Section 04: Tool wall
  new THREE.Vector3(-1, 1.6, -8),  // Section 05: Pinboard (slight left offset for pan)
  new THREE.Vector3(0, 1.6, -11),  // Section 06: Back door
])

const lookAtPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.5, 5),
  new THREE.Vector3(0, 1.4, 2),
  new THREE.Vector3(0, 1.5, -3),
  new THREE.Vector3(0, 1.5, -7),
  new THREE.Vector3(0, 1.5, -10),
  new THREE.Vector3(0, 1.3, -14),
])

export default function CameraController({ scrollProgress, targetSection }) {
  const { camera } = useThree()
  const currentProgress = useRef(0)
  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 5))
  const introComplete = useRef(false)
  const introProgress = useRef(-0.02) // Start slightly before 0 for intro push

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1.6, 10.5)
    camera.lookAt(0, 1.5, 5)
    camera.fov = 60
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame((_, delta) => {
    // Intro animation: push camera forward
    if (!introComplete.current) {
      introProgress.current += delta * 0.3
      if (introProgress.current >= 0) {
        introComplete.current = true
      } else {
        const t = Math.max(0, introProgress.current + 0.02) / 0.02
        const startPos = new THREE.Vector3(0, 1.6, 10.5)
        const endPos = cameraPath.getPoint(0)
        camera.position.lerpVectors(startPos, endPos, t)
        camera.lookAt(0, 1.5, 5)
        return
      }
    }

    // Determine target progress
    let target = scrollProgress
    if (targetSection !== null && targetSection !== undefined) {
      target = targetSection / 5
    }

    // Smooth lerp toward target
    currentProgress.current += (target - currentProgress.current) * 0.05
    const t = Math.max(0, Math.min(1, currentProgress.current))

    // Get position and lookAt from paths
    const pos = cameraPath.getPoint(t)
    const look = lookAtPath.getPoint(t)

    camera.position.lerp(pos, 0.08)
    currentLookAt.current.lerp(look, 0.08)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
