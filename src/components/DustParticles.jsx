import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DustParticles({ count = 500 }) {
  const meshRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4      // x: concentrated in center
      positions[i * 3 + 1] = Math.random() * 4.5         // y: floor to near ceiling
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22  // z: full room depth
      speeds[i] = 0.0005 + Math.random() * 0.001
    }
    return { positions, speeds }
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      // Drift upward
      pos[i * 3 + 1] += particles.speeds[i]
      // Gentle horizontal sway
      pos[i * 3] += Math.sin(Date.now() * 0.0003 + i) * 0.0002
      // Reset when reaching top
      if (pos[i * 3 + 1] > 4.5) {
        pos[i * 3 + 1] = 0
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#fff8e7"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
