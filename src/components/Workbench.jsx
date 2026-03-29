import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Pegboard({ position }) {
  return (
    <group position={position}>
      {/* Board */}
      <mesh>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color="#5c4a2a" roughness={0.85} />
      </mesh>
      {/* Peg holes (decorative dots) */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[(col - 5.5) * 0.22, (row - 3.5) * 0.22, 0.03]}
          >
            <circleGeometry args={[0.02, 8]} />
            <meshStandardMaterial color="#4a3a20" />
          </mesh>
        ))
      )}
    </group>
  )
}

function Tool({ position, rotation, size, color }) {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
    </mesh>
  )
}

export default function Workbench() {
  return (
    <group position={[-2, 0, 4]}>
      {/* Workbench surface */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.08, 1]} />
        <meshStandardMaterial color="#5c3d1a" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Workbench legs */}
      {[[-1.1, 0.42, -0.4], [1.1, 0.42, -0.4], [-1.1, 0.42, 0.4], [1.1, 0.42, 0.4]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#3d2409" roughness={0.8} />
        </mesh>
      ))}

      {/* Cross brace */}
      <mesh position={[0, 0.25, -0.4]}>
        <boxGeometry args={[2.2, 0.06, 0.06]} />
        <meshStandardMaterial color="#3d2409" roughness={0.8} />
      </mesh>

      {/* Pegboard behind workbench */}
      <Pegboard position={[0, 2.2, -0.5]} />

      {/* Tools on pegboard */}
      {/* Hammer */}
      <Tool position={[-0.8, 2.5, -0.45]} rotation={[0, 0, 0.3]} size={[0.06, 0.5, 0.06]} color="#8B7355" />
      <Tool position={[-0.8, 2.78, -0.45]} rotation={[0, 0, 0.3]} size={[0.2, 0.08, 0.06]} color="#666" />

      {/* Ruler */}
      <Tool position={[0, 2.3, -0.45]} rotation={[0, 0, 0.1]} size={[0.08, 0.8, 0.01]} color="#b8860b" />

      {/* Pencil */}
      <Tool position={[0.6, 2.4, -0.45]} rotation={[0, 0, -0.2]} size={[0.025, 0.35, 0.025]} color="#f5c842" />

      {/* Some items on the bench surface */}
      {/* Sketchbook */}
      <mesh position={[-0.4, 0.92, 0.1]} rotation={[-Math.PI / 2, 0, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.25, 0.02]} />
        <meshStandardMaterial color="#e8d8c0" roughness={0.9} />
      </mesh>

      {/* Coffee mug */}
      <group position={[0.7, 0.92, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.1, 8]} />
          <meshStandardMaterial color="#5c3d1a" roughness={0.6} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.025, 0.008, 8, 8, Math.PI]} />
          <meshStandardMaterial color="#5c3d1a" roughness={0.6} />
        </mesh>
      </group>

      {/* Desk lamp */}
      <group position={[1, 0.89, 0.3]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.03, 8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.35]} />
          <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Shade */}
        <mesh position={[-0.05, 0.38, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.08, 0.1, 8, 1, true]} />
          <meshStandardMaterial color="#b8860b" metalness={0.5} roughness={0.4} side={2} />
        </mesh>
      </group>

      {/* Leather chair */}
      <group position={[0, 0, 1]}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
          <meshStandardMaterial color="#4a2a10" roughness={0.6} />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.75, -0.22]} castShadow>
          <boxGeometry args={[0.5, 0.55, 0.06]} />
          <meshStandardMaterial color="#4a2a10" roughness={0.6} />
        </mesh>
        {/* Legs */}
        {[[-0.2, 0.22, -0.2], [0.2, 0.22, -0.2], [-0.2, 0.22, 0.2], [0.2, 0.22, 0.2]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.015, 0.015, 0.44]} />
            <meshStandardMaterial color="#333" metalness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
