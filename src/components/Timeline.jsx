import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const timelineData = [
  {
    year: '2019',
    title: 'Tajassm 3D Agency',
    role: 'Founder & Designer',
    detail: 'CGI advertising videos & campaigns for PNU, ZAN, and government entities.',
    type: 'work',
  },
  {
    year: '2020',
    title: 'Princess Nourah University',
    role: 'Bachelor — Graphic Design & Digital Media',
    detail: 'Graduated with a degree in Graphic Design and Digital Media.',
    type: 'education',
  },
  {
    year: '2021',
    title: 'Princess Noura University',
    role: 'Visiting Lecturer',
    detail: 'Delivered lectures and workshops in graphic design.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'Ministry of Education',
    role: 'Lessons Author & Workshop Instructor',
    detail: 'Authored digital design curriculum for Saudi high school students.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'PwC — Emerging Tech Lab',
    role: 'KSA Emerging Tech Lab Lead & Creative Design Lead',
    detail: '50+ immersive lab tours, GenAI experiences, AR/VR demos. Led a team of 4.',
    type: 'work',
  },
  {
    year: '2025',
    title: 'PwC — Experience Centre',
    role: 'Riyadh Experience Centre Manager',
    detail: 'Led 15+ Experience Centre tours for C-suite stakeholders. Managed a team of 8.',
    type: 'work',
  },
  {
    year: '2026',
    title: 'Heriot-Watt University',
    role: 'Master — MSc Design Management',
    detail: 'Part-time postgraduate studies in Design Management.',
    type: 'education',
  },
]

function Particles({ count = 200 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#800020" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GlowOrb({ position, color = '#800020' }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15
      )
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.5} distort={0.3} speed={2} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function TimelineScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#800020" />
      <Particles />
      {timelineData.map((_, i) => {
        const x = (Math.random() - 0.5) * 12
        const y = (Math.random() - 0.5) * 6
        return <GlowOrb key={i} position={[x, y, -2]} />
      })}
    </>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <TimelineScene />
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">
            Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-sand-50">
            Career <span className="italic text-accent">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start mb-12 ${
                  isLeft
                    ? 'md:flex-row md:text-right'
                    : 'md:flex-row-reverse md:text-left'
                } flex-row`}
              >
                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
                      item.type === 'education'
                        ? 'bg-violet-900/30 text-violet-300 border border-violet-700/30'
                        : 'bg-accent/10 text-accent border border-accent/20'
                    }`}
                  >
                    {item.type === 'education' ? 'Education' : 'Work'}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-sand-50 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-accent text-sm mb-2">{item.role}</p>
                  <p className="text-sand-500 text-sm">{item.detail}</p>
                </div>

                {/* Dot on line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-sand-950 mt-2 z-10" />

                {/* Year badge */}
                <div
                  className={`absolute left-0 md:left-1/2 md:top-0 ${
                    isLeft ? 'md:translate-x-4' : 'md:-translate-x-[calc(100%+1rem)]'
                  } top-0`}
                >
                  <span className="text-sand-600 text-sm font-mono hidden md:block">
                    {item.year}
                  </span>
                  <span className="text-sand-600 text-xs font-mono md:hidden ml-1">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
