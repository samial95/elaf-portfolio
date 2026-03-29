import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const skills = [
  { name: 'Figma', color: '#a259ff', shape: 'square' },
  { name: 'Three.js', color: '#f5c842', shape: 'sphere' },
  { name: 'Blender', color: '#ea7600', shape: 'prism' },
  { name: 'React', color: '#61dafb', shape: 'ring' },
  { name: 'Photography', color: '#e8d8c0', shape: 'camera' },
  { name: 'Art Direction', color: '#b8860b', shape: 'frame' },
]

function SkillTool({ skill, position, isHovered, onHover, onUnhover }) {
  const meshRef = useRef()
  const targetZ = useRef(position[2])

  useFrame((state) => {
    if (!meshRef.current) return
    const hoverZ = isHovered ? position[2] + 0.2 : position[2]
    targetZ.current += (hoverZ - targetZ.current) * 0.1
    meshRef.current.position.z = targetZ.current

    // Slow idle rotation for some shapes
    if (skill.shape === 'ring' || skill.shape === 'sphere') {
      meshRef.current.rotation.y += 0.01
    }
  })

  const renderShape = () => {
    switch (skill.shape) {
      case 'square':
        return (
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.25, 0.04]} />
            <meshStandardMaterial color={skill.color} roughness={0.5} metalness={0.2} />
          </mesh>
        )
      case 'sphere':
        return (
          <mesh castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={isHovered ? 0.4 : 0.15}
              roughness={0.3}
            />
          </mesh>
        )
      case 'prism':
        return (
          <mesh castShadow rotation={[0, 0, 0]}>
            <coneGeometry args={[0.15, 0.28, 3]} />
            <meshStandardMaterial color={skill.color} roughness={0.5} flatShading />
          </mesh>
        )
      case 'ring':
        return (
          <mesh castShadow>
            <torusGeometry args={[0.12, 0.03, 8, 24]} />
            <meshStandardMaterial color={skill.color} roughness={0.3} metalness={0.4} />
          </mesh>
        )
      case 'camera':
        return (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.25, 0.18, 0.12]} />
              <meshStandardMaterial color="#333" roughness={0.6} />
            </mesh>
            {/* Lens */}
            <mesh position={[0, 0, 0.08]} castShadow>
              <cylinderGeometry args={[0.06, 0.07, 0.06, 12]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
            </mesh>
            {/* Viewfinder bump */}
            <mesh position={[-0.02, 0.11, 0]} castShadow>
              <boxGeometry args={[0.08, 0.05, 0.07]} />
              <meshStandardMaterial color="#333" roughness={0.6} />
            </mesh>
          </group>
        )
      case 'frame':
        return (
          <group>
            {/* Outer frame */}
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.24, 0.03]} />
              <meshStandardMaterial color={skill.color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Inner cutout */}
            <mesh position={[0, 0, 0.016]}>
              <boxGeometry args={[0.22, 0.16, 0.01]} />
              <meshStandardMaterial color="#1a1208" roughness={0.9} />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <group position={[position[0], position[1], position[2]]}>
      <group
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(skill.name) }}
        onPointerOut={(e) => { e.stopPropagation(); onUnhover() }}
      >
        {renderShape()}

        {/* Hook / nail */}
        <mesh position={[0, 0.22, -0.05]}>
          <cylinderGeometry args={[0.008, 0.008, 0.1]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

export default function ToolWall() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const positions = [
    [-1.8, 2.2, -0.2],
    [-0.6, 2.4, -0.2],
    [0.6, 2.1, -0.2],
    [1.8, 2.3, -0.2],
    [-1.2, 1.5, -0.2],
    [1.2, 1.6, -0.2],
  ]

  return (
    <group position={[0, 0, -4]}>
      {/* Pegboard background */}
      <mesh position={[0, 2, -0.4]} receiveShadow>
        <boxGeometry args={[5, 2.5, 0.08]} />
        <meshStandardMaterial color="#4a3a20" roughness={0.85} />
      </mesh>

      {/* Peg holes */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[(col - 6.5) * 0.32, 1.0 + row * 0.32, -0.35]}
          >
            <circleGeometry args={[0.015, 6]} />
            <meshStandardMaterial color="#3a2a10" />
          </mesh>
        ))
      )}

      {/* Skill tools */}
      {skills.map((skill, index) => (
        <SkillTool
          key={skill.name}
          skill={skill}
          position={positions[index]}
          isHovered={hoveredSkill === skill.name}
          onHover={(name) => {
            setHoveredSkill(name)
            document.body.style.cursor = 'pointer'
          }}
          onUnhover={() => {
            setHoveredSkill(null)
            document.body.style.cursor = 'default'
          }}
        />
      ))}
    </group>
  )
}

export { skills }
