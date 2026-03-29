import { useRef } from 'react'

export default function Room() {
  return (
    <group>
      {/* Floor — dark oak wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 24]} />
        <meshStandardMaterial color="#3d2409" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 24]} />
        <meshStandardMaterial color="#0f0d08" roughness={1.0} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -12]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#2a2015" roughness={0.8} />
      </mesh>

      {/* Front wall (behind camera start) */}
      <mesh position={[0, 2.5, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#2a2015" roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-7, 2.5, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 5]} />
        <meshStandardMaterial color="#1e1a10" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[7, 2.5, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 5]} />
        <meshStandardMaterial color="#1e1a10" roughness={0.85} />
      </mesh>

      {/* Baseboard trim — left */}
      <mesh position={[-6.95, 0.1, -1]}>
        <boxGeometry args={[0.1, 0.2, 24]} />
        <meshStandardMaterial color="#2a1a08" roughness={0.7} />
      </mesh>

      {/* Baseboard trim — right */}
      <mesh position={[6.95, 0.1, -1]}>
        <boxGeometry args={[0.1, 0.2, 24]} />
        <meshStandardMaterial color="#2a1a08" roughness={0.7} />
      </mesh>

      {/* Ceiling beams */}
      {[-6, -2, 2, 6].map((z) => (
        <mesh key={z} position={[0, 4.85, z]}>
          <boxGeometry args={[14, 0.15, 0.2]} />
          <meshStandardMaterial color="#2a1a08" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}
