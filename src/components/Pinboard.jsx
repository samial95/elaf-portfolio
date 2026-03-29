import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const timelineItems = [
  { text: 'Studied Design — 2020', x: -2.2, y: 2.1, rotation: -0.05 },
  { text: 'First Design Role — 2022', x: -0.7, y: 2.3, rotation: 0.04 },
  { text: 'Launched first 3D project — 2023', x: 0.8, y: 2.0, rotation: -0.07 },
  { text: 'Now — building the future', x: 2.3, y: 2.2, rotation: 0.03, isCurrent: true },
]

function PinCard({ item }) {
  return (
    <group position={[item.x, item.y, -0.15]} rotation={[0, 0, item.rotation]}>
      {/* Card */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.45, 0.01]} />
        <meshStandardMaterial
          color={item.isCurrent ? '#2a2015' : '#e8d8c0'}
          roughness={0.9}
        />
      </mesh>
      {/* Text area indicator */}
      <mesh position={[0, -0.05, 0.006]}>
        <planeGeometry args={[0.65, 0.12]} />
        <meshStandardMaterial
          color={item.isCurrent ? '#f5c842' : '#5c3d1a'}
          transparent
          opacity={item.isCurrent ? 0.6 : 0.3}
        />
      </mesh>
      {/* Pin */}
      <mesh position={[0, 0.17, 0.02]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color={item.isCurrent ? '#f5c842' : '#c04040'}
          emissive={item.isCurrent ? '#f5c842' : '#c04040'}
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      {/* Pin needle */}
      <mesh position={[0, 0.17, -0.01]}>
        <cylinderGeometry args={[0.004, 0.004, 0.04]} />
        <meshStandardMaterial color="#888" metalness={0.8} />
      </mesh>
    </group>
  )
}

function ConnectingThread() {
  const curve = useMemo(() => {
    const points = timelineItems.map(
      (item) => new THREE.Vector3(item.x, item.y + 0.17, -0.1)
    )
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 40, 0.006, 6, false)
  }, [curve])

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial color="#c04040" roughness={0.8} transparent opacity={0.7} />
    </mesh>
  )
}

export default function Pinboard() {
  return (
    <group position={[0, 0, -8]}>
      {/* Corkboard */}
      <mesh position={[0, 2, -0.3]} receiveShadow>
        <boxGeometry args={[6, 2, 0.1]} />
        <meshStandardMaterial color="#8B6914" roughness={0.95} />
      </mesh>

      {/* Corkboard frame */}
      {/* Top */}
      <mesh position={[0, 3.02, -0.3]}>
        <boxGeometry args={[6.15, 0.06, 0.14]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, 0.98, -0.3]}>
        <boxGeometry args={[6.15, 0.06, 0.14]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
      {/* Left */}
      <mesh position={[-3.05, 2, -0.3]}>
        <boxGeometry args={[0.06, 2.1, 0.14]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
      {/* Right */}
      <mesh position={[3.05, 2, -0.3]}>
        <boxGeometry args={[0.06, 2.1, 0.14]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>

      {/* Connecting thread between pins */}
      <ConnectingThread />

      {/* Pin cards */}
      {timelineItems.map((item, index) => (
        <PinCard key={index} item={item} />
      ))}

      {/* Some extra decorative pins */}
      {[[-2.5, 1.3], [1.5, 1.2], [2.8, 1.5]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -0.18]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#e8a020" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

export { timelineItems }
