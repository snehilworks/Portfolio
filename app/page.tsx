"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'framer-motion'
import SilkBackground from './SilkBackground'

interface MouseEvent {
  clientX: number;
  clientY: number;
}

type ProjectMetrics = {
  impact?: string;
  scale?: string;
  performance?: string;
  revenue?: string;
  growth?: string;
  users?: string;
  efficiency?: string;
  accuracy?: string;
  [key: string]: string | undefined;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: ProjectMetrics;
  featured: boolean;
  size: 'small' | 'medium' | 'large';
  achievement: string;
  businessValue: string;
}

// Custom Hooks
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

type MagneticButtonProps = React.ComponentProps<typeof motion.button> & {
  children?: React.ReactNode;
  className?: string;
};

// Enhanced Magnetic Button with premium effects
const MagneticButton = ({ children, className = "", ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
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

// Premium Animated Background
const PremiumBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
      
      {/* Mouse-following premium gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`
        }}
      />
      
      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl opacity-20"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, ${
              ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
            }, transparent)`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, Math.random() * 0.5 + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Premium grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}

// Revolutionary Hero Section - Enhanced for Global Competition
const techStack = [
  { name: "System Architecture", level: "Principal", icon: "🏗️" },
  { name: "AI/ML Engineering", level: "Expert", icon: "🧠" },
  { name: "Blockchain/Web3", level: "Expert", icon: "⛓️" },
  { name: "Cloud Native", level: "Expert", icon: "☁️" },
  { name: "DevOps/SRE", level: "Expert", icon: "⚡" }
]

const achievements = [
  "2+ Years Experience",
  "10+ Projects Delivered", 
  "99%+ Client Satisfaction",
  "Modern Tech Stack Expert"
]

const TypewriterTech = () => {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const current = techStack[index]
    const fullText = `${current.name} • ${current.level}`
    
    if (!deleting && displayed.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1))
      }, 100)
    } else if (!deleting && displayed.length === fullText.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1))
      }, 50)
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % techStack.length)
      }, 300)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <div className="flex items-center gap-4 justify-center">
      <span className="text-4xl">{techStack[index].icon}</span>
      <span className="inline-block font-bold text-2xl md:text-4xl bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent h-8 md:h-12">
        {displayed}
        <span className="animate-pulse text-purple-400">|</span>
      </span>
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Silk Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <SilkBackground 
          speed={2}
          scale={1.5}
          color="#6366f1"
          noiseIntensity={1.2}
          rotation={0.05}
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-purple-950/40 to-slate-950/60 pointer-events-none" />
      
      {/* Interactive mouse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      {/* Content layer */}
      <div className="text-center z-10 max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          {/* Elite Status Badge */}
          <motion.div 
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-purple-500/30 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="text-purple-300 font-semibold text-sm tracking-wider">🏆 ELITE SOFTWARE ARCHITECT</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
            SNEHIL
            <br />
            SHARMA
          </h1>
          
          <div className="mb-8">
            <TypewriterTech />
          </div>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4"
              >
                <div className="text-lg font-bold text-white">{achievement}</div>
              </motion.div>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming Complex Problems into Scalable Solutions • Building the Future of Technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-xl mx-auto">
            <MagneticButton
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-purple-500/30"
            >
              🚀 VIEW ELITE PROJECTS
            </MagneticButton>
            <MagneticButton
              className="border-2 border-purple-500 px-8 py-4 rounded-2xl text-purple-300 font-bold text-lg hover:bg-purple-500 hover:text-white transition-all duration-300 backdrop-blur-lg"
            >
              📧 HIRE ME NOW
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Elite Experience Section
const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation()
  
  const experiences = [
    {
      company: "LENS Corporation",
      role: "Full-Stack Developer",
      period: "2023 - Present",
      logo: "🏢",
      description: "Developing and maintaining web applications for a growing tech company. Working with modern technologies to build scalable solutions and contributing to the company's digital transformation.",
      achievements: [
        "🚀 Built responsive web applications serving 10K+ daily active users",
        "💰 Optimized application performance reducing load times by 40%",
        "👥 Collaborated with 5-person development team using Agile methodologies",
        "⚡ Implemented automated testing reducing bugs in production by 60%"
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker", "TypeScript"],
      color: "from-purple-600 to-violet-600",
      impact: "High-Performance Web Apps"
    },
    {
      company: "Stockarea",
      role: "Junior Full-Stack Developer", 
      period: "2022 - 2023",
      logo: "📈",
      description: "Started my professional journey at a fast-growing fintech startup. Gained hands-on experience with modern web development practices and financial technology systems.",
      achievements: [
        "💹 Developed trading dashboard features used by 1000+ daily traders",
        "📊 Created data visualization components improving user engagement by 25%",
        "🔧 Implemented CI/CD pipelines reducing deployment time from hours to minutes",
        "🎯 Maintained 99.9% uptime for critical trading features during market hours"
      ],
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
      color: "from-blue-600 to-cyan-600",
      impact: "Fintech Experience Gained"
    }
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6 relative">
            ELITE EXPERIENCE
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "200px" } : {}}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building enterprise solutions that scale globally and drive real business impact
          </p>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40">
                {/* Premium glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 rounded-3xl`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                    <div className="flex items-center gap-6">
                      <div className="text-6xl">{exp.logo}</div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{exp.company}</h3>
                        <p className="text-xl text-purple-300 font-semibold mb-1">{exp.role}</p>
                        <p className="text-gray-400">{exp.period}</p>
                      </div>
                    </div>
                    <div className={`px-6 py-3 bg-gradient-to-r ${exp.color} rounded-2xl text-white font-bold text-center min-w-fit`}>
                      {exp.impact}
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">{exp.description}</p>

                  {/* Achievements Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-gray-200 leading-relaxed">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30 font-semibold backdrop-blur-sm"
                      >
                        {tech}
                      </span>
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

// World-Class Skills Section
const SkillsSection = () => {
  const { ref, isInView } = useScrollAnimation()
  
  const skillCategories = [
    {
      title: "Frontend Architecture",
      icon: "🎨",
      description: "Building scalable, performant user experiences",
      skills: [
        { name: "React Ecosystem", level: 98, icon: "⚛️" },
        { name: "Next.js/SSR", level: 95, icon: "▲" },
        { name: "TypeScript", level: 96, icon: "📘" },
        { name: "Performance Optimization", level: 94, icon: "⚡" },
      ],
      gradient: "from-cyan-400 to-purple-600"
    },
    {
      title: "Backend Systems",
      icon: "🏗️", 
      description: "Designing robust, scalable server architectures",
      skills: [
        { name: "Node.js/Go", level: 97, icon: "🚀" },
        { name: "System Design", level: 93, icon: "📊" },
        { name: "Database Design", level: 91, icon: "🗄️" },
        { name: "API Architecture", level: 95, icon: "🔌" },
      ],
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      description: "Infrastructure that scales globally",
      skills: [
        { name: "AWS/Azure", level: 92, icon: "☁️" },
        { name: "Docker/K8s", level: 88, icon: "🐳" },
        { name: "CI/CD Pipelines", level: 90, icon: "🔄" },
        { name: "Monitoring/Observability", level: 87, icon: "📈" },
      ],
      gradient: "from-green-400 to-blue-600"
    }
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            WORLD-CLASS EXPERTISE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mastering the technologies that power the world's most successful companies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:border-purple-500/40 h-full">
                {/* Premium background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{category.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, i) => (
                      <div key={skill.name} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="text-white font-semibold">{skill.name}</span>
                          </div>
                          <span className="text-purple-300 font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ delay: index * 0.2 + i * 0.1 + 0.5, duration: 1.5 }}
                          />
                        </div>
                      </div>
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

// Game-Changing Projects Section
const ProjectsSection = () => {
  const { ref, isInView } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const projects: Project[] = [
    {
      id: 1,
      title: "TradeDash Pro",
      category: "FinTech Dashboard",
      description: "Modern trading dashboard with real-time data visualization and portfolio management features for retail and professional traders.",
      longDescription: "Built a comprehensive trading dashboard from scratch using React and Node.js. Features include real-time market data, interactive charts, portfolio tracking, and risk management tools. Integrated with multiple financial APIs and implemented secure user authentication and authorization.",
      image: "📈",
      technologies: ["React", "Node.js", "TypeScript", "WebSocket", "PostgreSQL", "Redis", "Chart.js", "AWS"],
      metrics: {
        users: "1K+ Users",
        performance: "99.5% Uptime",
        features: "50+ Features",
        timeline: "3 Months"
      },
      featured: true,
      size: "medium",
      achievement: "First Major Project Success",
      businessValue: "Improved trading efficiency by 40% for users"
    },
    {
      id: 2,
      title: "EcoTracker",
      category: "Environmental Web App",
      description: "Full-stack web application helping users track their carbon footprint and discover eco-friendly alternatives.",
      longDescription: "Developed a comprehensive environmental tracking platform where users can log daily activities, track carbon emissions, and get personalized recommendations. Features include data visualization, social sharing, gamification elements, and integration with environmental APIs.",
      image: "🌱",
      technologies: ["Next.js", "React", "Node.js", "MongoDB", "Chart.js", "Tailwind CSS", "Vercel"],
      metrics: {
        users: "500+ Users",
        engagement: "80% Return Rate",
        impact: "CO2 Tracking",
        growth: "50% Monthly"
      },
      featured: true,
      size: "medium",
      achievement: "Featured on Product Hunt",
      businessValue: "Promoted environmental awareness among users"
    },
    {
      id: 3,
      title: "TaskFlow Manager",
      category: "Productivity SaaS",
      description: "Team collaboration and project management tool with real-time updates, file sharing, and progress tracking.",
      longDescription: "Created a modern project management solution with features like task assignment, real-time collaboration, file uploads, progress tracking, and team analytics. Implemented responsive design, real-time notifications, and integrated calendar functionality.",
      image: "📋",
      technologies: ["React", "Express.js", "Socket.io", "PostgreSQL", "AWS S3", "Material-UI"],
      metrics: {
        teams: "50+ Teams",
        productivity: "30% Increase",
        features: "25+ Features",
        satisfaction: "4.8/5 Rating"
      },
      featured: true,
      size: "medium",
      achievement: "Used by Local Startups",
      businessValue: "Increased team productivity and collaboration"
    },
    {
      id: 4,
      title: "Personal Portfolio v2",
      category: "Creative Showcase",
      description: "Interactive portfolio website with advanced animations, 3D elements, and modern design patterns.",
      longDescription: "Designed and developed a cutting-edge portfolio website showcasing my projects and skills. Features smooth animations, interactive elements, responsive design, and optimized performance. Built with modern technologies and deployed with CI/CD pipeline.",
      image: "💼",
      technologies: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind CSS", "Vercel"],
      metrics: {
        visitors: "2K+ Visitors",
        performance: "95+ Lighthouse",
        animations: "10+ Custom",
        responsive: "100% Mobile"
      },
      featured: false,
      size: "small",
      achievement: "Impressed Potential Employers",
      businessValue: "Showcases technical skills effectively"
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
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            GAME-CHANGING PROJECTS
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Industry-defining solutions that have generated millions in revenue and transformed how businesses operate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative cursor-pointer ${getGridClass(project)}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40">
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg">
                      🏆 FEATURED
                    </div>
                  </div>
                )}

                {/* Project Visual */}
                <div className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl md:text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </div>

                {/* Project Content */}
                <div className="relative p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-purple-400 font-semibold text-sm tracking-wider">{project.category}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Achievement Badge */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                    <div className="text-purple-300 font-semibold text-sm">{project.achievement}</div>
                    <div className="text-gray-400 text-xs mt-1">{project.businessValue}</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-white/5 rounded-lg">
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-lg">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-purple-400 font-semibold text-lg">{selectedProject.category}</p>
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 max-w-md">
                    <div className="text-purple-300 font-semibold">{selectedProject.achievement}</div>
                    <div className="text-gray-400 text-sm mt-1">{selectedProject.businessValue}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Project Visual */}
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                <div className="text-9xl md:text-[200px] opacity-30">
                  {selectedProject.image}
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Enhanced Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div key={key} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-bold text-white mb-2">{value}</div>
                    <div className="text-gray-400 capitalize font-semibold">{key}</div>
                  </div>
                ))}
              </div>

              {/* Full Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-4">Technology Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <MagneticButton className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl shadow-amber-500/25">
                  💼 HIRE FOR SIMILAR PROJECT
                </MagneticButton>
                <MagneticButton className="flex-1 border-2 border-emerald-500 text-emerald-300 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-emerald-500/10">
                  📊 DETAILED CASE STUDY
                </MagneticButton>
                <MagneticButton className="flex-1 border-2 border-blue-500 text-blue-300 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-blue-500/10">
                  🎯 TECHNICAL DEEP DIVE
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Elite Testimonials Section
const TestimonialsSection = () => {
  const { ref, isInView } = useScrollAnimation()
  
  const testimonials = [
    {
      quote: "Snehil consistently delivers high-quality code and shows great potential. His trading dashboard exceeded our expectations and our users love the intuitive interface.",
      author: "Alex Kumar",
      role: "Senior Developer",
      company: "FinTech Startup",
      rating: 5,
      project: "Built TradeDash Pro dashboard"
    },
    {
      quote: "Working with Snehil was a great experience. He's reliable, communicates well, and always delivers on time. His technical skills are impressive for someone with 2 years experience.",
      author: "Maria Rodriguez", 
      role: "Project Manager",
      company: "Tech Consulting Agency",
      rating: 5,
      project: "Multiple web applications"
    },
    {
      quote: "Snehil has strong problem-solving skills and writes clean, maintainable code. He's someone I'd definitely want on my team for future projects.",
      author: "James Thompson",
      role: "Tech Lead",
      company: "Local Startup",
      rating: 5,
      project: "TaskFlow Manager development"
    }
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-400">⭐</span>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-gray-200 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author Info */}
              <div className="border-t border-white/10 pt-6">
                <div className="font-bold text-white text-lg">{testimonial.author}</div>
                <div className="text-amber-400 font-semibold">{testimonial.role}</div>
                <div className="text-gray-400 text-sm">{testimonial.company}</div>
                <div className="text-purple-300 text-sm mt-2 font-medium">{testimonial.project}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Premium Contact Section
const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '', budget: '', timeline: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { 
      icon: "📧", 
      label: "Premium Contact", 
      value: "snehil@principal-engineer.com",
      description: "$50K+ projects only • 24hr response"
    },
    { 
      icon: "💼", 
      label: "LinkedIn", 
      value: "linkedin.com/in/snehil-elite",
      description: "Fortune 500 recommendations"
    },
    { 
      icon: "🏆", 
      label: "Portfolio", 
      value: "Wall Street & Silicon Valley projects",
      description: "Billion-dollar systems architect"
    },
    { 
      icon: "🌍", 
      label: "Global Availability", 
      value: "US, Europe, Asia timezones",
      description: "Remote • On-site for enterprise"
    }
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            LET'S WORK TOGETHER
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <span className="text-purple-400 font-bold">2+ years experience</span> • Available for exciting projects • <span className="text-emerald-400 font-bold">Modern tech stack expert</span>
          </p>
          
          {/* Competitive Pricing Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg border border-purple-500/50 rounded-2xl"
          >
            <div className="text-center">
              <div className="text-purple-200 font-bold text-lg">COMPETITIVE RATES</div>
              <div className="text-white text-3xl font-black">$30-60/hour</div>
              <div className="text-gray-400 text-sm">Flexible project sizes</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-3xl font-bold text-white mb-2">Start Your Project</h3>
            <p className="text-gray-400 mb-8">Quality development • Competitive rates • Fast delivery guaranteed</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select budget</option>
                    <option value="1k-5k">$1k - $5k</option>
                    <option value="5k-15k">$5k - $15k</option>
                    <option value="15k-30k">$15k - $30k</option>
                    <option value="30k+">$30k+ (Large Project)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6months+">6+ months</option>
                    <option value="ongoing">Ongoing partnership</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Project Details *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                  placeholder="Tell me about your project, goals, and challenges..."
                  required
                />
              </div>
              
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/25"
              >
                {isSubmitting ? '🚀 Sending...' : '🚀 START THE CONVERSATION'}
              </MagneticButton>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center"
                >
                  ✅ Message sent! I'll get back to you within 24 hours.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center"
                >
                  ❌ Failed to send. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Work With Me</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Modern Tech Stack</h4>
                    <p className="text-gray-400 text-sm">React, Node.js, TypeScript, AWS, and latest tools</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Problem Solver</h4>
                    <p className="text-gray-400 text-sm">Strong analytical skills and creative solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Growing Experience</h4>
                    <p className="text-gray-400 text-sm">2+ years with proven track record of delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Fast & Reliable</h4>
                    <p className="text-gray-400 text-sm">On-time delivery with clean, maintainable code</p>
                  </div>
                </div>
              </div>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{info.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{info.label}</h4>
                    <p className="text-purple-300 font-medium">{info.value}</p>
                    <p className="text-gray-400 text-sm mt-1">{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Main Portfolio Component
export default function ElitePortfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <HeroSection />
      <div className="relative bg-slate-950">
        <PremiumBackground />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      
      {/* Premium Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's transform your ideas into industry-leading solutions that drive real business results.
            </p>
            <MagneticButton className="bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/25">
              🚀 Let's Build Something Amazing
            </MagneticButton>
            <div className="mt-12 pt-8 border-t border-white/10 text-gray-500 text-sm">
              © 2025 Snehil Sharma • Elite Software Architect • Building the Future
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}