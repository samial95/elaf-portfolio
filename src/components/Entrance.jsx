import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

function BrassNameplate({ position }) {
  return (
    <group position={position}>
      {/* Nameplate backing */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.4, 0.04]} />
        <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Inner bevel */}
      <mesh position={[0, 0, 0.021]}>
        <boxGeometry args={[1.05, 0.28, 0.005]} />
        <meshStandardMaterial color="#0d0906" roughness={0.9} />
      </mesh>
      {/* Text — using a simple mesh since Text3D needs font */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[0.8, 0.18]} />
        <meshBasicMaterial color="#f5c842" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function WelcomeMat() {
  return (
    <mesh position={[0, 0.01, 8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.5, 0.8]} />
      <meshStandardMaterial color="#2a1a0a" roughness={1} />
    </mesh>
  )
}

function DoorFrame() {
  return (
    <group position={[0, 2.5, 9.5]}>
      {/* Door frame — left */}
      <mesh position={[-0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 3, 0.15]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
      {/* Door frame — right */}
      <mesh position={[0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 3, 0.15]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
      {/* Door frame — top */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.15]} />
        <meshStandardMaterial color="#3d2409" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function Entrance() {
  return (
    <group>
      <DoorFrame />
      <WelcomeMat />
      {/* Brass nameplate on right wall near entrance */}
      <BrassNameplate position={[6.9, 1.8, 7.5]} />

      {/* Small side table near entrance */}
      <group position={[3, 0, 8]}>
        {/* Table top */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[0.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#5c3d1a" roughness={0.7} />
        </mesh>
        {/* Legs */}
        {[[-0.25, 0.35, -0.15], [0.25, 0.35, -0.15], [-0.25, 0.35, 0.15], [0.25, 0.35, 0.15]].map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.04, 0.7, 0.04]} />
            <meshStandardMaterial color="#3d2409" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Coat hooks on left wall */}
      {[7.5, 7.8, 8.1].map((z, i) => (
        <group key={i} position={[-6.85, 1.6, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.08, 0.15]} />
            <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
