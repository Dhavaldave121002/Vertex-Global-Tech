// ThreeScene.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';

// Laptop Model Component
const LaptopModel = React.memo(({ isActive }) => {
  const groupRef = useRef();
  const screenRef = useRef();
  const [lidOpen, setLidOpen] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Animate lid opening
    if (isActive && lidOpen < Math.PI / 2.5) {
      setLidOpen(prev => Math.min(prev + 0.05, Math.PI / 2.5));
    } else if (!isActive && lidOpen > 0) {
      setLidOpen(prev => Math.max(prev - 0.05, 0));
    }

    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.2, 1.6]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Lid */}
      <group rotation={[lidOpen, 0, 0]} position={[0, 0.1, -0.8]}>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2.4, 0.1, 1.6]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh ref={screenRef} position={[0, 0, 0.06]}>
          <boxGeometry args={[2.3, 0.01, 1.5]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffffff"
            emissiveIntensity={isActive ? 0.5 : 0}
          />
        </mesh>
      </group>
    </group>
  );
});

// Main 3D Scene
const DeviceShowcaseScene = ({ activeDevice }) => {
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        maxDistance={15}
        minDistance={5}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <LaptopModel isActive={activeDevice === 'laptop'} />
      </Float>
    </>
  );
};

export default function ThreeScene({ activeDevice }) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 2, 8], fov: 50 }}
      >
        <DeviceShowcaseScene activeDevice={activeDevice} />
      </Canvas>
    </div>
  );
}