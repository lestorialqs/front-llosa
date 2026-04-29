"use client";
import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Procedural building ─────────────────────────── */
function Building() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const floorCount = 10;
  const floorHeight = 0.38;
  const baseW = 2.2;
  const baseD = 1.4;
  const completedFloors = 7;

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Foundation */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[baseW + 0.5, 0.24, baseD + 0.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Floors */}
      {Array.from({ length: floorCount }).map((_, i) => {
        const y = 0.24 + i * floorHeight + floorHeight / 2;
        const done = i < completedFloors;
        return (
          <group key={i}>
            {/* Floor slab */}
            <mesh position={[0, y, 0]}>
              <boxGeometry args={[baseW, floorHeight * 0.82, baseD]} />
              <meshStandardMaterial
                color={done ? "#023143" : "#1e1e22"}
                metalness={0.5}
                roughness={0.35}
                transparent
                opacity={done ? 0.95 : 0.45}
              />
            </mesh>

            {/* Window strip - front */}
            <mesh position={[0, y, baseD / 2 + 0.005]}>
              <planeGeometry args={[baseW * 0.9, floorHeight * 0.5]} />
              <meshStandardMaterial
                color={done ? "#12a8e0" : "#333340"}
                emissive={done ? "#12a8e0" : "#000000"}
                emissiveIntensity={done ? 0.15 : 0}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Separator */}
            <mesh position={[0, y + floorHeight * 0.41, 0]}>
              <boxGeometry args={[baseW + 0.03, 0.008, baseD + 0.03]} />
              <meshStandardMaterial color="#0a4d6b" transparent opacity={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* Roof */}
      <mesh position={[0, 0.24 + floorCount * floorHeight + 0.06, 0]}>
        <boxGeometry args={[baseW + 0.15, 0.06, baseD + 0.15]} />
        <meshStandardMaterial color="#023143" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Crane mast */}
      <mesh position={[baseW / 2 + 0.25, 2.5, -baseD / 2]}>
        <boxGeometry args={[0.05, 5, 0.05]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      {/* Crane boom */}
      <mesh position={[baseW / 2 + 1, 4.9, -baseD / 2]}>
        <boxGeometry args={[1.8, 0.035, 0.035]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0a0a0b" />
      </mesh>
    </group>
  );
}

/* ── Fallback static visual ──────────────────────── */
function StaticFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#0a0a0b] rounded-2xl">
      <div className="relative">
        {/* Stylized building silhouette */}
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" className="opacity-60">
          <rect x="20" y="20" width="80" height="155" rx="4" fill="#023143" opacity="0.6" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x="30" y={30 + i * 18} width="12" height="10" rx="1" fill={i < 6 ? "#12a8e0" : "#333340"} opacity={i < 6 ? 0.6 : 0.2} />
              <rect x="48" y={30 + i * 18} width="12" height="10" rx="1" fill={i < 6 ? "#12a8e0" : "#333340"} opacity={i < 6 ? 0.6 : 0.2} />
              <rect x="66" y={30 + i * 18} width="12" height="10" rx="1" fill={i < 6 ? "#12a8e0" : "#333340"} opacity={i < 6 ? 0.6 : 0.2} />
              <rect x="84" y={30 + i * 18} width="12" height="10" rx="1" fill={i < 6 ? "#12a8e0" : "#333340"} opacity={i < 6 ? 0.6 : 0.2} />
            </g>
          ))}
          {/* Crane */}
          <rect x="100" y="5" width="3" height="90" fill="#f59e0b" opacity="0.5" />
          <rect x="85" y="5" width="30" height="3" fill="#f59e0b" opacity="0.5" />
          <line x1="110" y1="8" x2="110" y2="40" stroke="#888" strokeWidth="1" opacity="0.3" />
          {/* Base */}
          <rect x="10" y="175" width="100" height="5" rx="2" fill="#1a1a2e" />
        </svg>
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,49,67,0.3),transparent)] blur-xl" />
      </div>
      <p className="text-[11px] text-white/20 mt-4 font-medium">Visualización del proyecto</p>
    </div>
  );
}

export default function BuildingViewer() {
  const [hasError, setHasError] = useState(false);

  const onCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    const canvas = state.gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setHasError(true);
    });
  }, []);

  if (hasError) {
    return <StaticFallback />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 2.5, 4.5], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
        onCreated={onCreated}
        fallback={<StaticFallback />}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1} />
        <directionalLight position={[-3, 4, -3]} intensity={0.2} color="#12a8e0" />

        <Building />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />

        <fog attach="fog" args={["#0a0a0b", 7, 16]} />
      </Canvas>
    </div>
  );
}
