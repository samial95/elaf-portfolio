import { useRef } from 'react'

export default function Lighting() {
  return (
    <>
      {/* Main overhead lamps along the workshop */}
      <pointLight
        position={[0, 4, 7]}
        intensity={40}
        color="#f5c842"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
        distance={12}
        decay={2}
      />
      <pointLight
        position={[0, 4, 3]}
        intensity={35}
        color="#f5c842"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        distance={12}
        decay={2}
      />
      <pointLight
        position={[0, 4, -1]}
        intensity={35}
        color="#f5c842"
        castShadow
        distance={12}
        decay={2}
      />
      <pointLight
        position={[0, 4, -5]}
        intensity={30}
        color="#f5c842"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[0, 4, -9]}
        intensity={30}
        color="#e8a020"
        distance={12}
        decay={2}
      />

      {/* Soft fill from left (window light) */}
      <pointLight position={[-5, 2.5, 2]} intensity={4} color="#c8d4e8" distance={10} decay={2} />

      {/* Very subtle ambient — nothing is pure black */}
      <ambientLight intensity={0.06} color="#1a0f05" />

      {/* Lamp fixture meshes (simple pendant lamps) */}
      {[7, 3, -1, -5, -9].map((z) => (
        <group key={z} position={[0, 4.6, z]}>
          {/* Wire */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.3]} />
            <meshStandardMaterial color="#5c4a1a" />
          </mesh>
          {/* Shade */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.25, 0.12, 8, 1, true]} />
            <meshStandardMaterial color="#b8860b" side={2} metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Bulb glow */}
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#f5c842" />
          </mesh>
        </group>
      ))}
    </>
  )
}
