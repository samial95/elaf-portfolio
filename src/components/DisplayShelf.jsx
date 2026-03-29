import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const projects = [
  {
    id: 1,
    title: 'Brand Identity Project',
    description: [
      'Complete visual identity system for a luxury hospitality brand',
      'Logo, typography, colour palette, and comprehensive brand guidelines',
      'Delivered across print and digital touchpoints',
    ],
    basePosition: [-1.8, 1.65, -0.15],
  },
  {
    id: 2,
    title: 'UX Design Project',
    description: [
      'End-to-end redesign of a fintech mobile application',
      'User research, wireframing, prototyping, and usability testing',
      'Increased task completion rate by 40%',
    ],
    basePosition: [0, 1.75, -0.15],
  },
  {
    id: 3,
    title: '3D Interactive Experience',
    description: [
      'Immersive WebGL experience for a product launch event',
      'Real-time 3D visualization with interactive storytelling',
      'Built with Three.js and custom shader effects',
    ],
    basePosition: [1.8, 1.65, -0.15],
  },
]

function ProjectObject({ project, index, onHover, onUnhover, onClick, isHovered }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const targetY = useRef(project.basePosition[1])

  useFrame(() => {
    if (!meshRef.current) return
    const hoverTarget = isHovered ? project.basePosition[1] + 0.3 : project.basePosition[1]
    targetY.current += (hoverTarget - targetY.current) * 0.08
    meshRef.current.position.y = targetY.current

    // Gentle idle rotation
    meshRef.current.rotation.y += 0.003

    // Glow intensity
    if (glowRef.current) {
      const targetIntensity = isHovered ? 8 : 2
      glowRef.current.intensity += (targetIntensity - glowRef.current.intensity) * 0.1
    }
  })

  const renderObject = () => {
    switch (index) {
      case 0: // Framed canvas
        return (
          <group>
            {/* Frame */}
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.4, 0.04]} />
              <meshStandardMaterial color="#3d2409" roughness={0.6} />
            </mesh>
            {/* Canvas inner */}
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial color="#e8d8c0" roughness={0.9} />
            </mesh>
            {/* Abstract design on canvas */}
            <mesh position={[-0.05, 0.02, 0.028]}>
              <circleGeometry args={[0.08, 16]} />
              <meshStandardMaterial color="#b8860b" />
            </mesh>
            <mesh position={[0.08, -0.04, 0.028]}>
              <planeGeometry args={[0.12, 0.06]} />
              <meshStandardMaterial color="#5c3d1a" />
            </mesh>
          </group>
        )
      case 1: // Origami / folded form
        return (
          <group>
            <mesh castShadow rotation={[0.2, 0, 0.1]}>
              <coneGeometry args={[0.2, 0.35, 4]} />
              <meshStandardMaterial color="#e8d8c0" roughness={0.8} flatShading />
            </mesh>
            <mesh castShadow position={[0, -0.1, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.15, 0.2, 4]} />
              <meshStandardMaterial color="#d4c4a0" roughness={0.8} flatShading />
            </mesh>
          </group>
        )
      case 2: // Glowing cube
        return (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial
                color="#1a1208"
                roughness={0.3}
                metalness={0.5}
                emissive="#f5c842"
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
            {/* Screen face */}
            <mesh position={[0, 0, 0.151]}>
              <planeGeometry args={[0.25, 0.25]} />
              <meshBasicMaterial color="#f5c842" transparent opacity={isHovered ? 0.7 : 0.4} />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <group position={[project.basePosition[0], project.basePosition[1], project.basePosition[2]]}>
      <group
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(project.id) }}
        onPointerOut={(e) => { e.stopPropagation(); onUnhover() }}
        onClick={(e) => { e.stopPropagation(); onClick(project) }}
      >
        {renderObject()}
      </group>

      {/* Warm glow light beneath object */}
      <pointLight
        ref={glowRef}
        position={[0, -0.2, 0.3]}
        intensity={2}
        color="#f5c842"
        distance={2}
        decay={2}
      />

      {/* Brass label tag */}
      <group position={[0, 1.05, 0.1]}>
        <mesh>
          <planeGeometry args={[0.6, 0.08]} />
          <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

export default function DisplayShelf({ onProjectClick }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <group position={[0, 0, -0.5]}>
      {/* Wall-mounted shelf — long wooden plank */}
      <mesh position={[0, 1.2, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#5c3d1a" roughness={0.7} />
      </mesh>

      {/* Shelf brackets */}
      {[-2, 0, 2].map((x) => (
        <group key={x} position={[x, 1.0, -0.15]}>
          <mesh>
            <boxGeometry args={[0.06, 0.35, 0.06]} />
            <meshStandardMaterial color="#b8860b" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.17, 0.12]}>
            <boxGeometry args={[0.06, 0.06, 0.3]} />
            <meshStandardMaterial color="#b8860b" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Project objects */}
      {projects.map((project, index) => (
        <ProjectObject
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredId === project.id}
          onHover={(id) => {
            setHoveredId(id)
            document.body.style.cursor = 'pointer'
          }}
          onUnhover={() => {
            setHoveredId(null)
            document.body.style.cursor = 'default'
          }}
          onClick={onProjectClick}
        />
      ))}
    </group>
  )
}

export { projects }
