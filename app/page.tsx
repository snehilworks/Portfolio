"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";
import SilkBackground from "./SilkBackground";

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
};

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
  size: "small" | "medium" | "large";
  achievement: string;
  businessValue: string;
}

// Custom Hooks
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

type MagneticButtonProps = React.ComponentProps<typeof motion.button> & {
  children?: React.ReactNode;
  className?: string;
};

// Enhanced Magnetic Button with premium effects
const MagneticButton = ({
  children,
  className = "",
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

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
  );
};

// Premium Animated Background
// const PremiumBackground = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", updateMousePosition);
//     return () => window.removeEventListener("mousemove", updateMousePosition);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* Dynamic gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

//       {/* Mouse-following premium gradient - hidden on mobile for performance */}
//       <motion.div
//         className="absolute inset-0 opacity-30 hidden md:block"
//         style={{
//           background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
//         }}
//       />

//       {/* Floating orbs - reduced on mobile */}
//       {[...Array(window.innerWidth < 768 ? 4 : 8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full blur-xl opacity-20"
//           style={{
//             width: `${
//               Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100
//             }px`,
//             height: `${
//               Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100
//             }px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             background: `linear-gradient(45deg, ${
//               ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"][
//                 Math.floor(Math.random() * 5)
//               ]
//             }, transparent)`,
//           }}
//           animate={{
//             x: [0, Math.random() * 200 - 100, 0],
//             y: [0, Math.random() * 200 - 100, 0],
//             scale: [1, Math.random() * 0.5 + 0.5, 1],
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             delay: Math.random() * 5,
//           }}
//         />
//       ))}

//       {/* Premium grid overlay */}
//       <div
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
//           `,
//           backgroundSize: "60px 60px",
//         }}
//       />
//     </div>
//   );
// };

const PremiumBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbs, setOrbs] = useState<
    {
      width: number;
      height: number;
      left: string;
      top: string;
      bg: string;
      x: number[];
      y: number[];
      scale: number[];
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    // Track mouse position
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    // Generate orbs only in browser
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
    const generatedOrbs = Array.from({ length: orbCount }, () => {
      const size = Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100;
      return {
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: `linear-gradient(45deg, ${
          colors[Math.floor(Math.random() * colors.length)]
        }, transparent)`,
        x: [0, Math.random() * 200 - 100, 0],
        y: [0, Math.random() * 200 - 100, 0],
        scale: [1, Math.random() * 0.5 + 0.5, 1],
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      };
    });
    setOrbs(generatedOrbs);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

      {/* Mouse-follow gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 hidden md:block"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
        }}
      />

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl opacity-20"
          style={{
            width: `${orb.width}px`,
            height: `${orb.height}px`,
            left: orb.left,
            top: orb.top,
            background: orb.bg,
          }}
          animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

// Revolutionary Hero Section - Enhanced for Mobile
// const techStack = [
//   { name: "System Architecture", level: "Junior", icon: "🏗️" },
//   { name: "AI/ML Engineering", level: "Junior", icon: "🧠" },
//   { name: "Blockchain/Web3", level: "Junior", icon: "⛓️" },
//   { name: "Cloud Native", level: "Junior", icon: "☁️" },
//   { name: "DevOps/SRE", level: "Junior", icon: "⚡" },
// ];

const techStack = [
  {
    name: "System Architecture",
    level: "Designed a scalable microservices diagram for a SaaS app",
    icon: "🏗️",
  },
  {
    name: "AI/ML Engineering",
    level: "Trained a sentiment analysis model on 10k tweets",
    icon: "🧠",
  },
  {
    name: "Blockchain/Web3",
    level: "Built an NFT minting dApp on Ethereum testnet",
    icon: "⛓️",
  },
  {
    name: "Cloud Native",
    level: "Deployed app on Kubernetes + CI/CD pipeline",
    icon: "☁️",
  },
  {
    name: "DevOps/SRE",
    level: "Automated infra monitoring with Grafana + Prometheus",
    icon: "⚡",
  },
];

const achievements = [
  "2+ Years Experience",
  "10+ Projects Delivered",
  "99%+ Client Satisfaction",
  "Modern Tech Stack Expert",
];

const TypewriterTech = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = techStack[index];
    const fullText = `${current.name} • ${current.level}`;

    if (!deleting && displayed.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, 100);
    } else if (!deleting && displayed.length === fullText.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1));
      }, 50);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % techStack.length);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
      <span className="text-2xl sm:text-3xl md:text-4xl">
        {techStack[index].icon}
      </span>
      <span className="inline-block font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent text-center min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[3rem]">
        {displayed}
        <span className="animate-pulse text-purple-400">|</span>
      </span>
    </div>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Silk Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <SilkBackground
          speed={5}
          scale={1}
          color="#7ec8cf"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-purple-950/40 to-slate-950/60 pointer-events-none" />

      {/* Interactive mouse effect - hidden on mobile */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      {/* Content layer */}
      <div className="text-center z-10 max-w-6xl mx-auto relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            SNEHIL
            <br />
            SHARMA
          </h1>

          <div className="mb-6 sm:mb-8">
            <TypewriterTech />
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 sm:p-4"
              >
                <div className="text-sm sm:text-base lg:text-lg font-bold text-white text-center">
                  {achievement}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Transforming Complex Problems into Scalable Solutions • Building the
            Future of Technology
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto px-4"
        >
          <MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-gray-500 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white font-bold text-base sm:text-lg border border-white-400/40 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 View Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section - Mobile Optimized
const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const experiences = [
    {
      company: "LENS Corporation",
      role: "Full-Stack & Backend Developer",
      period: "Jan 2025 – Present",
      logo: "/lens.png",
      description:
        "Contributing to the backend infrastructure of a video management platform, focusing on high-performance streaming, playback optimization, and deployment pipelines. Built and maintained Electron-based desktop applications with TypeScript for seamless cross-platform delivery.",
      achievements: [
        "🔴 Engineered backend services in Go for live streaming and on-demand playback with low-latency performance",
        "⚙️ Developed scalable API endpoints supporting real-time video workflows",
        "💻 Built and maintained Electron desktop apps with TypeScript for video content management",
        "🚢 Automated build and deployment pipelines to streamline cross-platform releases",
      ],
      technologies: [
        "Go",
        "TypeScript",
        "Electron",
        "Next.js",
        "PostgreSQL",
        "AWS",
        "Docker",
      ],
      color: "from-purple-600 to-violet-600",
      impact: "High-Performance Streaming & Desktop Delivery",
    },
    {
      company: "Stockarea",
      role: "Backend Developer",
      period: "2023 – 2024",
      logo: "/sa.png",
      description:
        "Worked on backend systems for a nationwide digital warehousing and transportation network, enhancing database performance, implementing new service features, and improving overall platform scalability.",
      achievements: [
        "📦 Designed and optimized backend APIs powering logistics operations across 100+ warehouses in India",
        "🗄️ Migrated and refactored database schemas to improve query efficiency and reduce latency",
        "🚀 Built new backend modules to support expanded warehouse and transportation services",
        "🔍 Implemented monitoring and performance tuning for critical infrastructure components",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "AWS",
        "React",
      ],
      color: "from-blue-600 to-cyan-600",
      impact: "Nationwide Logistics Platform Backend",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 relative">
            EXPERIENCE
            <motion.div
              className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 h-1 sm:h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "150px" } : {}}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Building enterprise solutions that scale globally and drive real
            business impact
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 rounded-2xl sm:rounded-3xl`}
                />

                <div className="relative z-10">
                  {/* Header - Mobile Optimized */}
                  <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={100}
                        height={100}
                        className="rounded-md object-contain sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px]"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                          {exp.company}
                        </h3>
                        <p className="text-lg sm:text-xl text-purple-300 font-semibold mb-1">
                          {exp.role}
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {exp.period}
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto">
                      <div
                        className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${exp.color} rounded-xl sm:rounded-2xl text-white font-bold text-center text-sm sm:text-base`}
                      >
                        {exp.impact}
                      </div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements Grid - Mobile Responsive */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors"
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack - Mobile Friendly */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl border border-purple-500/30 font-semibold backdrop-blur-sm text-sm sm:text-base"
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
  );
};

// World-Class Skills Section - Mobile Optimized
const SkillsSection = () => {
  const { ref, isInView } = useScrollAnimation();

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
      gradient: "from-cyan-400 to-purple-600",
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
      gradient: "from-purple-400 to-pink-600",
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
      gradient: "from-green-400 to-blue-600",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            EXPERTISE
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Mastering the technologies that power the world&apos;s most
            successful companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 hover:border-purple-500/40 h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 rounded-2xl sm:rounded-3xl group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="text-3xl sm:text-4xl lg:text-5xl">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {category.skills.map((skill, i) => (
                      <div key={skill.name} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">
                              {skill.icon}
                            </span>
                            <span className="text-white font-semibold text-sm sm:text-base">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-purple-300 font-bold text-sm sm:text-base">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : {}
                            }
                            transition={{
                              delay: index * 0.2 + i * 0.1 + 0.5,
                              duration: 1.5,
                            }}
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
  );
};

// Projects Section - Mobile Responsive
const ProjectsSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "EcoTracker 1",
      category: "Environmental Web App",
      description:
        "Full-stack web application helping users track their carbon footprint and discover eco-friendly alternatives.",
      longDescription:
        "Developed a comprehensive environmental tracking platform where users can log daily activities, track carbon emissions, and get personalized recommendations. Features include data visualization, social sharing, gamification elements, and integration with environmental APIs.",
      image: "🌱",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        users: "500+ Users",
        engagement: "80% Return Rate",
        impact: "CO2 Tracking",
        growth: "50% Monthly",
      },
      featured: true,
      size: "medium",
      achievement: "Featured on Product Hunt",
      businessValue: "Promoted environmental awareness among users",
    },
    {
      id: 2,
      title: "EcoTracker",
      category: "Environmental Web App",
      description:
        "Full-stack web application helping users track their carbon footprint and discover eco-friendly alternatives.",
      longDescription:
        "Developed a comprehensive environmental tracking platform where users can log daily activities, track carbon emissions, and get personalized recommendations. Features include data visualization, social sharing, gamification elements, and integration with environmental APIs.",
      image: "🌱",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        users: "500+ Users",
        engagement: "80% Return Rate",
        impact: "CO2 Tracking",
        growth: "50% Monthly",
      },
      featured: true,
      size: "small",
      achievement: "Featured on Product Hunt",
      businessValue: "Promoted environmental awareness among users",
    },
    {
      id: 3,
      title: "Personal Portfolio v2",
      category: "Creative Showcase",
      description:
        "Interactive portfolio website with advanced animations, 3D elements, and modern design patterns.",
      longDescription:
        "Designed and developed a cutting-edge portfolio website showcasing my projects and skills. Features smooth animations, interactive elements, responsive design, and optimized performance. Built with modern technologies and deployed with CI/CD pipeline.",
      image: "💼",
      technologies: [
        "Next.js",
        "Three.js",
        "Framer Motion",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        visitors: "2K+ Visitors",
        performance: "95+ Lighthouse",
        animations: "10+ Custom",
        responsive: "100% Mobile",
      },
      featured: false,
      size: "small",
      achievement: "Impressed Potential Employers",
      businessValue: "Showcases technical skills effectively",
    },
    {
      id: 4,
      title: "TaskFlow Manager",
      category: "Productivity SaaS",
      description:
        "Team collaboration and project management tool with real-time updates, file sharing, and progress tracking.",
      longDescription:
        "Created a modern project management solution with features like task assignment, real-time collaboration, file uploads, progress tracking, and team analytics. Implemented responsive design, real-time notifications, and integrated calendar functionality.",
      image: "📋",
      technologies: [
        "React",
        "Express.js",
        "Socket.io",
        "PostgreSQL",
        "AWS S3",
        "Material-UI",
      ],
      metrics: {
        teams: "50+ Teams",
        productivity: "30% Increase",
        features: "25+ Features",
        satisfaction: "4.8/5 Rating",
      },
      featured: true,
      size: "medium",
      achievement: "Used by Local Startups",
      businessValue: "Increased team productivity and collaboration",
    },
  ];

  const getGridClass = (project: Project, isMobile: boolean) => {
    if (isMobile) return "col-span-1"; // Single column on mobile

    switch (project.size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2";
      default:
        return "md:col-span-1";
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            PROJECTS
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            Building high-impact digital experiences with clean architecture,
            scalable systems, and a passion for elegant UI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative cursor-pointer ${getGridClass(
                project,
                isMobile
              )}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40 min-h-[400px] sm:min-h-[500px]">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg">
                      🏆 FEATURED
                    </div>
                  </div>
                )}

                {/* Project Visual */}
                <div className="relative h-32 sm:h-48 md:h-64 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </div>

                {/* Project Content */}
                <div className="relative p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-purple-400 font-semibold text-xs sm:text-sm tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed flex-1 text-sm sm:text-base line-clamp-3">
                    {project.description}
                  </p>

                  {/* Achievement Badge */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                    <div className="text-purple-300 font-semibold text-xs sm:text-sm">
                      {project.achievement}
                    </div>
                    <div className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {project.businessValue}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {Object.entries(project.metrics)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="text-center p-2 bg-white/5 rounded-lg"
                        >
                          <div className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies
                      .slice(0, isMobile ? 3 : 4)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    {project.technologies.length > (isMobile ? 3 : 4) && (
                      <span className="px-2 sm:px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-lg">
                        +{project.technologies.length - (isMobile ? 3 : 4)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Modal - Mobile Responsive */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 max-w-6xl w-full max-h-[95vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-purple-400 font-semibold text-base sm:text-lg">
                    {selectedProject.category}
                  </p>
                  <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                    <div className="text-purple-300 font-semibold text-sm sm:text-base">
                      {selectedProject.achievement}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm mt-1">
                      {selectedProject.businessValue}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 sm:p-3 hover:bg-white/10 rounded-full flex-shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Project Visual */}
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[200px] opacity-30">
                  {selectedProject.image}
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Enhanced Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10"
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {value}
                    </div>
                    <div className="text-gray-400 capitalize font-semibold text-xs sm:text-sm">
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Tech Stack */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl border border-purple-500/30 font-semibold text-sm sm:text-base"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <MagneticButton className="flex-1 border-2 border-emerald-500 text-emerald-300 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-emerald-500/10 relative overflow-hidden">
                  <span className="live-indicator mr-2">
                    <span className="dot"></span>
                    <span className="pulse"></span>
                    <span className="pulse"></span>
                  </span>
                  Live Website
                  <style jsx>{`
                    .live-indicator {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      width: 14px;
                      height: 14px;
                    }

                    .dot {
                      position: absolute;
                      width: 8px;
                      height: 8px;
                      background-color: red;
                      border-radius: 50%;
                      z-index: 2;
                    }

                    .pulse {
                      position: absolute;
                      width: 14px;
                      height: 14px;
                      background-color: red;
                      border-radius: 50%;
                      opacity: 0.6;
                      animation: pulse-ring 1.5s ease-out infinite;
                      z-index: 1;
                    }

                    .pulse:nth-child(3) {
                      animation-delay: 0.75s;
                    }

                    @keyframes pulse-ring {
                      0% {
                        transform: scale(1);
                        opacity: 0.6;
                      }
                      70% {
                        transform: scale(2.2);
                        opacity: 0;
                      }
                      100% {
                        opacity: 0;
                      }
                    }
                  `}</style>
                </MagneticButton>

                <MagneticButton className="flex-1 border-2 border-blue-500 text-blue-300 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-500/10">
                  💻 Codebase
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Testimonials Section - Mobile Optimized
const TestimonialsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const testimonials = [
    {
      quote:
        "Snehil consistently delivers high-quality code and shows great potential. His trading dashboard exceeded our expectations and our users love the intuitive interface.",
      author: "Alex Kumar",
      role: "Senior Developer",
      company: "FinTech Startup",
      rating: 5,
      project: "Built TradeDash Pro dashboard",
    },
    {
      quote:
        "Working with Snehil was a great experience. He's reliable, communicates well, and always delivers on time. His technical skills are impressive for someone with 2 years experience.",
      author: "Maria Rodriguez",
      role: "Project Manager",
      company: "Tech Consulting Agency",
      rating: 5,
      project: "Multiple web applications",
    },
    {
      quote:
        "Snehil has strong problem-solving skills and writes clean, maintainable code. He's someone I'd definitely want on my team for future projects.",
      author: "James Thompson",
      role: "Tech Lead",
      company: "Local Startup",
      rating: 5,
      project: "TaskFlow Manager development",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-500"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl sm:text-2xl text-amber-400">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-white/10 pt-4 sm:pt-6">
                <div className="font-bold text-white text-base sm:text-lg">
                  {testimonial.author}
                </div>
                <div className="text-amber-400 font-semibold text-sm sm:text-base">
                  {testimonial.role}
                </div>
                <div className="text-gray-400 text-sm">
                  {testimonial.company}
                </div>
                <div className="text-purple-300 text-xs sm:text-sm mt-2 font-medium">
                  {testimonial.project}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
        timeline: "",
        projectType: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            <span className="text-purple-400 font-bold">
              2+ years experience
            </span>{" "}
            • Available for exciting projects •{" "}
            <span className="text-emerald-400 font-bold">
              Modern tech stack expert
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Start Your Project
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Quality development • Fast delivery • Let&apos;s build something
              amazing
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select project type</option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="website">Website</option>
                    <option value="api">API Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        timeline: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6months+">6+ months</option>
                    <option value="ongoing">Ongoing partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors h-24 sm:h-32 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project, goals, and challenges..."
                  required
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/25"
              >
                {isSubmitting ? "🚀 Sending..." : "🚀 START THE CONVERSATION"}
              </MagneticButton>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg sm:rounded-xl text-green-300 text-center text-sm sm:text-base"
                >
                  ✅ Message sent! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl text-red-300 text-center text-sm sm:text-base"
                >
                  ❌ Failed to send. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Why Work With Me */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Why Work With Me
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">🚀</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Modern Tech Stack
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      React, Node.js, TypeScript, AWS, and latest tools
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Problem Solver
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Strong analytical skills and creative solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">📈</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Growing Experience
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      2+ years with proven track record of delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Fast & Reliable
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      On-time delivery with clean, maintainable code
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl">✉️</div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Email
                  </h4>
                  <p className="text-purple-300 font-medium text-sm sm:text-base break-all">
                    work.snehil01@gmail.com
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Best way to reach me
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    [in]
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    LinkedIn
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Professional profile
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    𝕏
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Twitter
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Follow my journey
                  </p>
                </div>
              </motion.a>
            </div>

            <motion.a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  🌟
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Portfolio
                  </h4>
                  <p className="text-purple-300 font-medium text-sm sm:text-base">
                    View My Work
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Check out my latest projects
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
export default function Portfolio() {
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
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s transform your ideas into industry-leading solutions
              that drive real business results.
            </p>
            <MagneticButton className="bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/25">
              🚀 Let&apos;s Build Something Amazing
            </MagneticButton>
            <div className="mt-12 pt-8 border-t border-white/10 text-gray-500 text-sm">
              © 2025 Snehil Sharma • Software Engineer • Building the Future
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
