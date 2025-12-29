import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("3D Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full w-full text-blue-500 bg-blue-900/20 rounded-xl border border-blue-500/30">
          <div className="text-center p-6">
            <i className="bi bi-display text-4xl mb-2 block"></i>
            <span className="font-mono text-sm">Interactive 3D Preview</span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SAFE 3D COMPONENTS (Native Only) ---

const NativeFloat = ({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = Math.sin(t * speed) * 0.1 * floatIntensity;
      ref.current.rotation.x = (Math.sin(t * speed) * 0.05 * rotationIntensity);
      ref.current.rotation.z = (Math.sin(t * speed) * 0.05 * rotationIntensity);
    }
  });
  return <group ref={ref}>{children}</group>;
};

const LaptopModel = ({ variant }) => {
  return (
    <NativeFloat speed={2}>
      <group rotation={[0.2, 0.4, 0]}>
        {/* Base */}
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[2.4, 0.15, 1.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Screen Group */}
        <group position={[0, -0.7, -0.75]} rotation={[-0.2, 0, 0]}>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[2.4, 1.6, 0.08]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.8, 0.05]}>
            <planeGeometry args={[2.2, 1.4]} />
            <meshBasicMaterial color="#000" />
          </mesh>
          {/* Content Mockup */}
          <mesh position={[0, 0.8, 0.06]}>
            <planeGeometry args={[2.0, 1.2]} />
            <meshBasicMaterial color="#334155" />
          </mesh>
          {/* Variant Text Placeholder */}
          <mesh position={[0, 0.8, 0.07]}>
            <planeGeometry args={[0.5, 0.1]} />
            <meshBasicMaterial color={variant === 'ecommerce' ? '#3b82f6' : '#10b981'} />
          </mesh>
        </group>
      </group>
    </NativeFloat>
  )
}

const PhoneModel = () => {
  return (
    <NativeFloat speed={2.5}>
      <group rotation={[0, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[1.0, 2.0, 0.15]} />
          <meshStandardMaterial color="#312e81" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[0.9, 1.9]} />
          <meshBasicMaterial color="#000" />
        </mesh>
        {/* App UI Lines */}
        <mesh position={[0, 0.5, 0.09]}>
          <planeGeometry args={[0.7, 0.1]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
        <mesh position={[0, 0.2, 0.09]}>
          <planeGeometry args={[0.7, 0.1]} />
          <meshBasicMaterial color="#6d28d9" />
        </mesh>
      </group>
    </NativeFloat>
  )
}


function Lights() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, 0, 5]} intensity={1} color="blue" />
    </>
  );
}

export default function ServiceHero3D({ title, subtitle, badge, highlight, variant = 'informative' }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Check immediately
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderModel = () => {
    switch (variant) {
      case 'ecommerce':
      case 'maintenance':
      case 'dynamic':
      case 'informative':
        return <LaptopModel variant={variant} />;
      case 'application':
        return <PhoneModel />;
      case 'uiux':
        return (
          <group>
            <group position={[-1, 0, 0]} scale={0.8}><LaptopModel variant="dynamic" /></group>
            <group position={[1.2, -0.5, 0.5]} scale={0.7}><PhoneModel /></group>
          </group>
        );
      default:
        return <LaptopModel variant="informative" />;
    }
  };

  return (
    <div className="relative min-h-[100vh] lg:min-h-screen bg-[#030712] flex flex-col-reverse lg:flex-row items-center overflow-hidden pt-20 lg:pt-0">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* LEFT CONTENT */}
      <div className="w-full lg:w-1/2 px-6 lg:pl-20 z-10 text-center lg:text-left pb-20 lg:pb-0">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold text-sm tracking-widest uppercase backdrop-blur-md"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          {title.split(highlight).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500">
                  {highlight}
                </span>
              )}
            </React.Fragment>
          ))}
          {!highlight && title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <span>Start Project</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </motion.div>
      </div>

      {/* RIGHT CONTENT (3D with Error Boundary and Safe Mode) */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative z-10">
        {/* 3D DIAGNOSTIC MODE: Canvas Temporarily Disabled */}
        <div className="w-full h-full flex items-center justify-center bg-gray-900/50 border border-gray-800 rounded-3xl backdrop-blur-sm p-10 m-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
              <i className={`bi ${variant === 'application' ? 'bi-phone' : 'bi-laptop'} text-4xl text-blue-400`}></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3D Visualization</h3>
            <p className="text-gray-400 text-sm">Interactive model disabled for system compatibility check.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
