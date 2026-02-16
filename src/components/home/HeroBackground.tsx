import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 15, // 15-25 seconds
    delay: Math.random() * 5, // 0-5 second delay
  }));
}

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => generateParticles(25), []);

  // Static version for reduced motion preference
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Static Dot Grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dot-grid"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Static Gradient Orbs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[90px]" />

        {/* Accent orb */}
        <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>
    );
  }

  // Animated version
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated Dot Grid - enhanced visibility with pulse */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </motion.svg>

      {/* Animated Top-Right Orb - enhanced visibility with dynamic motion */}
      <motion.div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 opacity-20 blur-[100px]"
        animate={{
          x: [0, 50, 0, -30, 0],
          y: [0, -30, -50, -20, 0],
          scale: [1, 1.15, 1, 1.08, 1],
          opacity: [0.2, 0.25, 0.2, 0.22, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated Bottom-Left Orb - enhanced counter-rotation */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/15 opacity-[0.15] blur-[90px]"
        animate={{
          x: [0, -40, 0, 30, 0],
          y: [0, 30, 50, 20, 0],
          scale: [1, 0.92, 1, 1.08, 1],
          opacity: [0.15, 0.2, 0.15, 0.18, 0.15],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* New Accent Orb - adds depth and movement */}
      <motion.div
        className="absolute top-1/2 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 opacity-10 blur-[80px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.1, 0.15, 0.1, 0.12, 0.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles - enhanced visibility */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary opacity-10 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 20, -20, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
