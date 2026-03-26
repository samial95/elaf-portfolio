import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const tools = [
  'Figma',
  'Miro',
  'Adobe Suite',
  'Claude',
  'CapCut',
  'OpenAI',
  'Midjourney',
  'Blender',
  'Bamboo Studio',
  'Adobe Firefly',
  'Canva',
  'Spatial',
]

function ToolSphere({ name, position, index }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const basePos = useRef(position)
  const phase = useMemo(() => index * 0.8, [index])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y =
        basePos.current[1] + Math.sin(t * 0.5 + phase) * 0.3
      groupRef.current.position.x =
        basePos.current[0] + Math.cos(t * 0.3 + phase) * 0.15
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2 + phase
      meshRef.current.rotation.z = t * 0.15 + phase
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color="#800020"
          wireframe
          transparent
          opacity={0.6}
          emissive="#800020"
          emissiveIntensity={0.3}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap text-sand-200 text-xs font-medium bg-sand-950/70 px-2 py-1 rounded-full border border-accent/20 backdrop-blur-sm">
          {name}
        </div>
      </Html>
    </group>
  )
}

function FloatingGrid() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2
      ref.current.position.y = -2
      ref.current.material.opacity =
        0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })
  return (
    <mesh ref={ref}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial color="#800020" wireframe transparent opacity={0.05} />
    </mesh>
  )
}

function ToolkitScene() {
  const positions = useMemo(() => {
    const cols = 4
    const spacing = 2.2
    return tools.map((_, i) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      const x = (col - (cols - 1) / 2) * spacing + (Math.random() - 0.5) * 0.5
      const y = (1 - row) * spacing + (Math.random() - 0.5) * 0.3
      const z = (Math.random() - 0.5) * 2
      return [x, y, z]
    })
  }, [])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#800020" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#5c0017" />
      <FloatingGrid />
      {tools.map((tool, i) => (
        <ToolSphere key={tool} name={tool} position={positions[i]} index={i} />
      ))}
    </>
  )
}

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Software
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            Skills & <span className="italic text-accent accent-glow">Toolkit</span>
          </h2>
        </motion.div>

        {/* 3D Canvas */}
        <div className="h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-sand-800/30">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ToolkitScene />
          </Canvas>
        </div>

        {/* Fallback text list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-full bg-sand-900/40 border border-sand-800/40 text-sand-300 text-sm hover:border-accent/30 hover:text-accent transition-colors"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
