"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'framer-motion'
import { FaReact } from 'react-icons/fa'
import Image from 'next/image';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiRedux } from 'react-icons/si'
// import SilkBackground from './SilkBackground';

interface MouseEvent {
  clientX: number;
  clientY: number;
}

type ProjectMetrics = {
  users?: string;
  performance?: string;
  growth?: string;
  conversion?: string;
  satisfaction?: string;
  revenue?: string;
  engagement?: string;
  retention?: string;
  assets?: string;
  accuracy?: string;
  clients?: string;
  patients?: string;
  [key: string]: string | undefined;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string;
  technologies: string[];
  metrics: ProjectMetrics;
  featured: boolean;
  size: 'small' | 'medium' | 'large';
}

// Custom Hooks
// const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', updateMousePosition)
//     return () => window.removeEventListener('mousemove', updateMousePosition)
//   }, [])
  
//   return mousePosition
// }

const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Animated Background Component
// const AnimatedBackground = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', updateMousePosition)
//     return () => window.removeEventListener('mousemove', updateMousePosition)
//   }, [])

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      
//       {/* Mouse-following gradient */}
//       <motion.div 
//         className="absolute inset-0 opacity-40"
//         style={{
//           background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
//         }}
//       />
      
//       {/* Animated particles */}
//       {[...Array(50)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-white rounded-full opacity-30"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -100, 0],
//             opacity: [0.3, 1, 0.3],
//           }}
//           transition={{
//             duration: Math.random() * 3 + 2,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//           }}
//         />
//       ))}
      
//       {/* Grid overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.02]"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px'
//         }}
//       />
//     </div>
//   )
// }

// Cursor Follower
// const CursorFollower = () => {
//   const [isHovering, setIsHovering] = useState(false)
//   const cursorX = useMotionValue(-100)
//   const cursorY = useMotionValue(-100)
//   const springConfig = { damping: 25, stiffness: 700 }
//   const cursorXSpring = useSpring(cursorX, springConfig)
//   const cursorYSpring = useSpring(cursorY, springConfig)

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       cursorX.set(e.clientX - 16)
//       cursorY.set(e.clientY - 16)
//     }

//     const handleMouseEnter = () => setIsHovering(true)
//     const handleMouseLeave = () => setIsHovering(false)

//     window.addEventListener('mousemove', moveCursor)
    
//     const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]')
//     interactiveElements.forEach(el => {
//       el.addEventListener('mouseenter', handleMouseEnter)
//       el.addEventListener('mouseleave', handleMouseLeave)
//     })

//     return () => {
//       window.removeEventListener('mousemove', moveCursor)
//       interactiveElements.forEach(el => {
//         el.removeEventListener('mouseenter', handleMouseEnter)
//         el.removeEventListener('mouseleave', handleMouseLeave)
//       })
//     }
//   }, [cursorX, cursorY])

//   return (
//     <motion.div
//       className="fixed top-0 left-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full pointer-events-none z-50 mix-blend-difference"
//       style={{
//         x: cursorXSpring,
//         y: cursorYSpring,
//       }}
//       animate={{
//         scale: isHovering ? 1.5 : 1,
//       }}
//       transition={{ type: "spring", stiffness: 500, damping: 28 }}
//     />
//   )
// }

// Hero Section with 3D Text Effect
const frontendSkills = [
  "Next.js",
  "TypeScript", 
  "GoLang",
  "Cloud",
  "NodeJS"
]

const TypewriterSkills = () => {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentSkill = frontendSkills[index]
    if (!deleting && displayed.length < currentSkill.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentSkill.slice(0, displayed.length + 1))
      }, 80)
    } else if (!deleting && displayed.length === currentSkill.length) {
      timeout = setTimeout(() => setDeleting(true), 1200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentSkill.slice(0, displayed.length - 1))
      }, 40)
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % frontendSkills.length)
      }, 300)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="inline-block font-bold text-3xl md:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent h-12 md:h-16 transition-all duration-300">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// const HeroSkillsAnimation = () => {
//   // Array of icon components and their colors
//   const icons = [
//     { icon: <FaReact className="text-cyan-400" />, name: 'React' },
//     { icon: <SiNextdotjs className="text-white" />, name: 'Next.js' },
//     { icon: <SiTypescript className="text-blue-400" />, name: 'TypeScript' },
//     { icon: <SiTailwindcss className="text-teal-300" />, name: 'Tailwind CSS' },
//     { icon: <SiFramer className="text-pink-400" />, name: 'Framer Motion' },
//     { icon: <SiRedux className="text-purple-400" />, name: 'Redux' },
//   ]

//   // Animate icons in a floating up and down pattern, staggered
//   return (
//     <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 z-20">
//       <div className="relative w-32 h-[340px] flex flex-col items-center justify-center">
//         {icons.map((item, i) => (
//           <motion.div
//             key={item.name}
//             initial={{ y: 0 }}
//             animate={{ y: [0, -20, 0, 20, 0] }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               delay: i * 0.4,
//               ease: "easeInOut"
//             }}
//             className="mb-6 last:mb-0 flex items-center justify-center text-5xl drop-shadow-lg bg-black/40 rounded-full w-16 h-16 border border-white/10 backdrop-blur-md shadow-lg"
//             title={item.name}
//           >
//             {item.icon}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }

const HeroRightAnimation = () => {
  // Particle configuration
  const particles = useMemo(() => [
    { radius: 120, size: 12, color: 'bg-purple-400', duration: 7, angle: 0 },
    { radius: 80, size: 8, color: 'bg-pink-400', duration: 5, angle: 60 },
    { radius: 100, size: 10, color: 'bg-blue-400', duration: 9, angle: 120 },
    { radius: 60, size: 7, color: 'bg-yellow-300', duration: 6, angle: 200 },
    { radius: 150, size: 14, color: 'bg-emerald-400', duration: 11, angle: 300 },
    { radius: 90, size: 9, color: 'bg-pink-300', duration: 8, angle: 250 },
  ], []);

  // Helper to get x/y from polar coordinates
  const getXY = (radius: number, angle: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
    }
  }

  // For lines between some particles
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4], [2, 5]
  ]

  // Animate the angle for each particle
  const [angles, setAngles] = useState(particles.map(p => p.angle))
  useEffect(() => {
    const interval = setInterval(() => {
      setAngles(prev => prev.map((a, i) => (a + 360 / (particles[i].duration * 60)) % 360))
    }, 1000 / 60)
    return () => clearInterval(interval)
  }, [particles])

  return (
    <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {/* SVG for lines */}
        <svg className="absolute left-0 top-0 w-full h-full" style={{ zIndex: 1 }}>
          {lines.map(([a, b], i) => {
            const p1 = getXY(particles[a].radius, angles[a])
            const p2 = getXY(particles[b].radius, angles[b])
            return (
              <line
                key={i}
                x1={200 + p1.x}
                y1={200 + p1.y}
                x2={200 + p2.x}
                y2={200 + p2.y}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                opacity="0.5"
              />
            )
          })}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Particles */}
        {particles.map((particle, i) => {
          const { x, y } = getXY(particle.radius, angles[i])
          return (
            <motion.div
              key={i}
              className={`absolute ${particle.color} rounded-full shadow-lg`}
              style={{
                width: `${particle.size * 2}px`,
                height: `${particle.size * 2}px`,
                left: `calc(50% + ${x}px - ${particle.size}px)` ,
                top: `calc(50% + ${y}px - ${particle.size}px)` ,
                filter: 'blur(0.5px)',
                zIndex: 2,
              }}
              animate={{
                boxShadow: [
                  `0 0 16px 4px rgba(168,139,250,0.3)`,
                  `0 0 32px 8px rgba(244,114,182,0.2)`,
                  `0 0 16px 4px rgba(168,139,250,0.3)`
                ]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}
        {/* Central Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 rounded-full blur-2xl opacity-60" style={{ zIndex: 0 }} />
      </div>
    </div>
  )
}

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black px-2 sm:px-4">
      {/* Silk animated background for hero only */}
      {/* <SilkBackground color="#7B7481" speed={5} scale={1} noiseIntensity={1.5} rotation={0} /> */}
      {/* Mouse-following gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: 600,
          height: 600,
        }}
        transition={{ type: "spring", damping: 30 }}
      />
      {/* Electron Animations: only on md+ */}
      <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none" style={{ transform: 'scaleX(-1) translateY(-50%)' }}>
        <HeroRightAnimation />
      </div>
      <HeroRightAnimation />
      <div className="text-center z-10 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2 sm:mb-4">
            SNEHIL SHARMA
          </h1>
          <div className="mb-4 sm:mb-6 flex justify-center">
            <TypewriterSkills />
          </div>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Full-Stack Developer
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4 sm:space-y-6"
        >
          <p className="text-sm xs:text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Crafting exceptional digital experiences with cutting-edge technology and innovative design
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
            <MagneticButton
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              data-cursor="pointer"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              className="w-full sm:w-auto border-2 border-purple-500 px-8 py-4 rounded-full text-purple-300 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
              data-cursor="pointer"
            >
              Get In Touch
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Experience Section
const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation()
  
  const experiences = [
    {
      company: "LENS Corporation",
      role: "Software Developer",
      period: "2025 - Present",
      logo: "lens.png",
      description: "Leading development of enterprise-scale applications using React, Node.js, and cloud technologies.",
      achievements: [
        "Architected and implemented microservices architecture reducing system latency by 40%",
        "Led a team of 5 developers in delivering a major platform upgrade",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ],
      technologies: ["React", "Node.js", "AWS", "Docker", "GraphQL"],
      color: "from-purple-500 to-pink-500"
    },
    {
      company: "Stockarea",
      role: "Backend Developer",
      period: "2024 - 2025",
      logo: "sa.png",
      description: "Developed and maintained multiple web applications for clients in various industries.",
      achievements: [
        "Built real-time collaboration features using WebSocket and Redis",
        "Optimized database queries improving application performance by 35%",
        "Implemented automated testing increasing code coverage to 85%"
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "WebSocket"],
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <section ref={ref} className="py-12 sm:py-20 md:py-32 px-2 sm:px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 md:mb-20"
        >
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-2 sm:mb-4 md:mb-6 relative">
              EXPERIENCE
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline line - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-pink-500/50" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                {/* Company info */}
                <motion.div
                  className={`md:text-right ${index % 2 === 1 ? 'md:order-2' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                >
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-2xl md:rounded-3xl" style={{ backgroundImage: `linear-gradient(to right, ${exp.color})` }} />
                    <div className="relative z-10">
                      {/* Company Logo */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                        <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center">
                        <Image
                          src={`/${exp.logo}`}
                          alt={`${exp.company} logo`}
                          width={exp.company === "LENS Corporation" ? 120 : 140}
                          height={exp.company === "LENS Corporation" ? 50 : 45}
                          className="h-full w-auto object-contain"
                          style={{
                            maxWidth: exp.company === "LENS Corporation" ? "120px" : "140px",
                            maxHeight: exp.company === "LENS Corporation" ? "50px" : "45px"
                          }}
                        />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{exp.company}</h3>
                          <p className="text-base sm:text-lg md:text-xl text-purple-300 leading-tight">{exp.role}</p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-2 sm:mb-4 md:mb-6">{exp.period}</p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-2 sm:mb-4 md:mb-6">{exp.description}</p>
                      <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 sm:gap-3">
                            <span className="text-purple-400 mt-1">•</span>
                            <p className="text-xs sm:text-sm md:text-base text-gray-300">{achievement}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4 md:mt-6 justify-end md:justify-end">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 bg-white/5 text-gray-300 text-xs sm:text-sm rounded-lg border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* Timeline dot - hidden on mobile */}
                <motion.div
                  className={`hidden md:flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills with Interactive Cards
const SkillsSection = () => {
  const { ref, isInView } = useScrollAnimation()
  
  const skills = [
    { 
      name: "Frontend", 
      icon: "⚛️",
      technologies: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "TypeScript", icon: "📘" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Framer Motion", icon: "✨" },
        { name: "Redux", icon: "🔄" },
      ],
      color: "from-cyan-400 via-blue-500 to-purple-600" 
    },
    { 
      name: "Backend", 
      icon: "⚡",
      technologies: [
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚂" },
        { name: "Python", icon: "🐍" },
        { name: "Django", icon: "🎸" },
        { name: "FastAPI", icon: "⚡" },
        { name: "REST APIs", icon: "🔌" },
        { name: "WebSockets", icon: "🔌" },
        { name: "Microservices", icon: "🔧" }
      ],
      color: "from-blue-400 via-blue-600 to-indigo-600" 
    },
    { 
      name: "Database & DevOps", 
      icon: "☁️",
      technologies: [
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Redis", icon: "🔴" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "CI/CD", icon: "🔄" },
        { name: "Git", icon: "📦" },
        { name: "Linux", icon: "🐧" }
      ],
      color: "from-emerald-400 via-teal-500 to-cyan-600" 
    }
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-block">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 relative">
              EXPERTISE
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/30 h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-4xl">{skill.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {skill.technologies.map((tech) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{ scale: 1.05 }}
                        className="group/tech"
                      >
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 text-gray-300 text-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
                          <span className="text-lg">{tech.icon}</span>
                          <span>{tech.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects with Advanced Layouts
const ProjectsSection = () => {
  const { ref, isInView } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  const projects: Project[] = [
    {
      id: 1,
      title: "NeuroFlow AI",
      category: "AI/ML Platform",
      description: "Revolutionary neural network visualization platform with real-time model training insights and interactive 3D architecture mapping.",
      longDescription: "A comprehensive machine learning platform that transforms how developers and researchers interact with neural networks. Features include real-time training visualization, interactive model architecture editing, and collaborative research tools.",
      image: "/projects/neuroflow.gif",
      video: "/projects/neuroflow.mp4",
      technologies: ["React", "Three.js", "TensorFlow.js", "WebGL", "D3.js"],
      metrics: {
        performance: "99.9%",
        accuracy: "98.5%",
        features: "15+"
      },
      featured: true,
      size: "medium"
    },
    {
      id: 2,
      title: "Quantum Commerce",
      category: "E-Commerce",
      description: "Next-generation shopping experience with AR product visualization and AI-powered personalization engine.",
      longDescription: "Revolutionizing online shopping through immersive technologies. Users can visualize products in their space using AR, while our AI learns preferences to create personalized shopping journeys.",
      image: "/projects/quantum.gif",
      video: "/projects/quantum.mp4",
      technologies: ["Next.js", "WebXR", "Stripe", "GraphQL", "PostgreSQL"],
      metrics: {
        performance: "98%",
        features: "20+",
        accuracy: "97%"
      },
      featured: true,
      size: "small"
    },
    {
      id: 3,
      title: "MetaSpace Social",
      category: "Social Platform",
      description: "Immersive 3D social platform where users create, collaborate, and connect in virtual spaces.",
      longDescription: "A groundbreaking social platform that brings people together in customizable 3D environments. Features spatial audio, collaborative creation tools, and cross-platform compatibility.",
      image: "🌐",
      technologies: ["React", "WebRTC", "Three.js", "Socket.io", "MongoDB"],
      metrics: {
        performance: "95%",
        features: "25+",
        latency: "<100ms"
      },
      featured: false,
      size: "small"
    },
    {
      id: 4,
      title: "FinanceFlow Pro",
      category: "FinTech",
      description: "Advanced financial dashboard with predictive analytics and automated investment strategies.",
      longDescription: "Professional-grade financial management platform featuring real-time market analysis, automated portfolio optimization, and institutional-level security protocols.",
      image: "📊",
      technologies: ["Vue.js", "Python", "FastAPI", "Redis", "PostgreSQL"],
      metrics: {
        accuracy: "94%",
        features: "18+",
        performance: "96%"
      },
      featured: false,
      size: "medium"
    },
    {
      id: 5,
      title: "CreativeStudio",
      category: "Design Tools",
      description: "Browser-based design suite with collaborative features and AI-assisted creation workflows.",
      longDescription: "A powerful design platform that runs entirely in the browser, featuring vector editing, collaborative workflows, and AI-powered design suggestions to streamline creative processes.",
      image: "🎨",
      technologies: ["Canvas API", "WebGL", "Socket.io", "Node.js", "AWS"],
      metrics: {
        performance: "97%",
        features: "30+",
        accuracy: "95%"
      },
      featured: true,
      size: "medium"
    },
    {
      id: 6,
      title: "HealthSync",
      category: "HealthTech",
      description: "Comprehensive health monitoring platform with IoT integration and telemedicine capabilities.",
      longDescription: "Connecting patients, doctors, and health data through seamless IoT integration. Features include real-time vital monitoring, AI health insights, and secure telemedicine consultations.",
      image: "🏥",
      technologies: ["React Native", "IoT", "WebRTC", "HIPAA", "MongoDB"],
      metrics: {
        accuracy: "96%",
        features: "22+",
        performance: "98%"
      },
      featured: false,
      size: "small"
    }
  ]

  const getGridClass = (project: Project) => {
    switch (project.size) {
      case 'large': return 'md:col-span-2 md:row-span-2'
      case 'medium': return 'md:col-span-2'
      default: return 'md:col-span-1'
    }
  }

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 relative">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6">
            FEATURED WORK
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Innovative projects that push the boundaries of technology and design
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${getGridClass(project)} cursor-pointer`}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-cursor="pointer"
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/30">
                {/* Project Media */}
                <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Video Preview */}
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.image}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                  </motion.div>
                </div>
                
                {/* Project Info */}
                <div className="relative z-10 p-6 md:p-8">
                  {project.featured && (
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg shadow-purple-500/20">
                      FEATURED
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-purple-400 font-semibold mb-2 tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-4 py-1.5 bg-gray-500/20 text-gray-400 text-xs rounded-full backdrop-blur-sm">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-white/10">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-base md:text-lg font-bold text-white">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 md:p-8 lg:p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-purple-400 font-semibold">{selectedProject.category}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  ✕
                </button>
              </div>
              
              {/* Video Preview in Modal */}
              <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-[1.5rem] overflow-hidden mb-6 md:mb-8">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={selectedProject.image}
                >
                  <source src={selectedProject.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
              </div>
              
              <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-2xl p-4 md:p-6 text-center backdrop-blur-sm border border-white/10">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{value as string}</div>
                    <div className="text-sm text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedProject.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <MagneticButton className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-2xl font-semibold text-base md:text-lg shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
                  VIEW LIVE DEMO
                </MagneticButton>
                <MagneticButton className="flex-1 border border-purple-500 text-purple-300 py-3 md:py-4 px-6 md:px-8 rounded-2xl font-semibold hover:bg-purple-500/10 text-base md:text-lg backdrop-blur-sm transition-all duration-300">
                  VIEW CODE
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Add ContactSection component
const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                placeholder="Your message..."
                required
              />
            </div>
            <div className="flex justify-end">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </MagneticButton>
            </div>
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-center"
              >
                Message sent successfully!
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-center"
              >
                Failed to send message. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default function PortfolioSections() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/50 [&::-webkit-scrollbar-thumb]:bg-purple-500/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-purple-500/70 [&::-webkit-scrollbar]:hover:w-3 transition-all duration-300">
      {/* SilkBackground removed from here, now only in HeroSection */}
      {/* <AnimatedBackground /> */}
      {/* <CursorFollower /> */}
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
