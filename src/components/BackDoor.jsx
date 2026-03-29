import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function BackDoor() {
  const lightRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      // Subtle light flicker
      lightRef.current.intensity = 15 + Math.sin(state.clock.elapsedTime * 2) * 2
    }
  })

  return (
    <group position={[0, 0, -11.5]}>
      {/* Door frame */}
      <group position={[1, 1.5, -0.3]}>
        {/* Frame left */}
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.8, 0.12]} />
          <meshStandardMaterial color="#3d2409" roughness={0.7} />
        </mesh>
        {/* Frame right */}
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2.8, 0.12]} />
          <meshStandardMaterial color="#3d2409" roughness={0.7} />
        </mesh>
        {/* Frame top */}
        <mesh position={[0, 1.42, 0]} castShadow>
          <boxGeometry args={[1.1, 0.1, 0.12]} />
          <meshStandardMaterial color="#3d2409" roughness={0.7} />
        </mesh>

        {/* Door — slightly ajar (rotated) */}
        <group position={[0.45, 0, 0]} rotation={[0, -0.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 2.7, 0.06]} />
            <meshStandardMaterial color="#4a3018" roughness={0.75} />
          </mesh>
          {/* Door handle */}
          <mesh position={[-0.3, 0, 0.04]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[-0.3, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.08]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* Light bleeding through the gap */}
        <pointLight
          ref={lightRef}
          position={[0.8, 0, 0.5]}
          intensity={15}
          color="#f5c842"
          distance={5}
          decay={2}
        />
      </group>

      {/* Small workbench / table near contact area */}
      <group position={[-2, 0, 0]}>
        {/* Table surface */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#5c3d1a" roughness={0.7} />
        </mesh>
        {/* Legs */}
        {[[-0.5, 0.37, -0.25], [0.5, 0.37, -0.25], [-0.5, 0.37, 0.25], [0.5, 0.37, 0.25]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.05, 0.74, 0.05]} />
            <meshStandardMaterial color="#3d2409" roughness={0.8} />
          </mesh>
        ))}
        {/* "Handwritten note" on table */}
        <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0.05]} castShadow>
          <planeGeometry args={[0.5, 0.35]} />
          <meshStandardMaterial color="#e8d8c0" roughness={0.95} />
        </mesh>
        {/* "Text lines" on note */}
        {[-0.06, -0.01, 0.04, 0.09].map((y, i) => (
          <mesh key={i} position={[-0.02, 0.785, y]} rotation={[-Math.PI / 2, 0, 0.05]}>
            <planeGeometry args={[0.3 - i * 0.04, 0.008]} />
            <meshStandardMaterial color="#5c3d1a" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Stool */}
      <group position={[-2, 0, 0.8]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 12]} />
          <meshStandardMaterial color="#4a2a10" roughness={0.6} />
        </mesh>
        {[[-0.12, 0.2, -0.12], [0.12, 0.2, -0.12], [-0.12, 0.2, 0.12], [0.12, 0.2, 0.12]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.012, 0.015, 0.4]} />
            <meshStandardMaterial color="#333" metalness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
