"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type CarChoice = { name: string; color: string; accent: string };

const ROD_COLORS = ["#d9dade", "#cfd0d5", "#e2e3e6", "#d5d6da", "#dcdde1"];

function Rod({
  x,
  z,
  length,
  index,
  onRing,
}: {
  x: number;
  z: number;
  length: number;
  index: number;
  onRing: (pitch: number) => void;
}) {
  const pivot = useRef<THREE.Group>(null);
  const vel = useRef(0);
  const ang = useRef(0);
  const hover = useRef(false);

  useFrame((state, dt) => {
    // pendulum with damping + breeze
    const breeze = Math.sin(state.clock.elapsedTime * (0.8 + index * 0.13)) * 0.02;
    const target = breeze + (hover.current ? Math.sin(state.clock.elapsedTime * 2.2) * 0.09 : 0);
    const accel = (target - ang.current) * 14 - vel.current * 2.4;
    vel.current += accel * dt;
    ang.current += vel.current * dt;
    if (pivot.current) {
      pivot.current.rotation.x = ang.current;
      pivot.current.rotation.z = ang.current * 0.6;
    }
  });

  const strike = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    vel.current += 2.2;
    onRing(0.8 + index * 0.14);
  };

  return (
    <group position={[x, 0, z]} ref={pivot}>
      {/* string */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.5, 6]} />
        <meshStandardMaterial color="#8a7a63" />
      </mesh>
      {/* rod */}
      <mesh
        position={[0, -0.5 - length / 2, 0]}
        onClick={strike}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
      >
        <cylinderGeometry args={[0.045, 0.045, length, 20, 1, true]} />
        <meshStandardMaterial
          color={ROD_COLORS[index % ROD_COLORS.length]}
          metalness={0.85}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* rod cap */}
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.04, 20]} />
        <meshStandardMaterial color="#b08d57" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

function ClassicCar({ car }: { car: CarChoice }) {
  return (
    <group scale={0.85}>
      {/* lower body */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.1, 0.22, 0.44]} />
        <meshStandardMaterial color={car.color} metalness={0.55} roughness={0.3} />
      </mesh>
      {/* cabin */}
      <mesh position={[0.02, 0.2, 0]}>
        <boxGeometry args={[0.62, 0.2, 0.4]} />
        <meshStandardMaterial color={car.color} metalness={0.55} roughness={0.3} />
      </mesh>
      {/* windows */}
      <mesh position={[0.02, 0.21, 0]}>
        <boxGeometry args={[0.5, 0.13, 0.42]} />
        <meshStandardMaterial color="#dfe7ea" metalness={0.2} roughness={0.15} />
      </mesh>
      {/* chrome base */}
      <mesh position={[0, -0.09, 0]}>
        <boxGeometry args={[1.16, 0.05, 0.46]} />
        <meshStandardMaterial color={car.accent} metalness={0.9} roughness={0.18} />
      </mesh>
      {/* wheels */}
      {[-0.38, 0.38].map((wx) =>
        [-0.24, 0.24].map((wz) => (
          <mesh key={`${wx}${wz}`} position={[wx, -0.1, wz]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.07, 20]} />
            <meshStandardMaterial color="#22201f" roughness={0.8} />
          </mesh>
        ))
      )}
      {/* whitewalls */}
      {[-0.38, 0.38].map((wx) =>
        [-0.28, 0.28].map((wz) => (
          <mesh key={`w${wx}${wz}`} position={[wx, -0.1, wz]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.075, 16]} />
            <meshStandardMaterial color="#e8e2d6" roughness={0.6} />
          </mesh>
        ))
      )}
      {/* headlights */}
      {[-0.13, 0.13].map((hz) => (
        <mesh key={hz} position={[0.56, 0.04, hz]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#f7efdd" emissive="#f7efdd" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ChimeModel({
  car,
  onRing,
  dragging,
}: {
  car: CarChoice;
  onRing: (pitch: number) => void;
  dragging: React.MutableRefObject<boolean>;
}) {
  const group = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const rotVel = useRef(0.15);
  const swayA = useRef(0);
  const swayV = useRef(0);

  const rods = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return {
          x: Math.cos(a) * 0.78,
          z: Math.sin(a) * 0.78,
          length: 1.35 + ((i * 7) % 5) * 0.16,
        };
      }),
    []
  );

  useFrame((state, dt) => {
    if (!group.current) return;
    // free rotation with gentle idle spin
    if (!dragging.current) rotVel.current += (0.12 - rotVel.current) * 0.01;
    rotY.current += rotVel.current * dt;
    group.current.rotation.y = rotY.current;
    // whole-chime sway like wind catching it
    const wind = Math.sin(state.clock.elapsedTime * 0.5) * 0.035;
    const accel = (wind - swayA.current) * 8 - swayV.current * 2;
    swayV.current += accel * dt;
    swayA.current += swayV.current * dt;
    group.current.rotation.z = swayA.current;
  });

  // expose nudge for drag
  (ChimeModel as unknown as { nudge: (d: number) => void }).nudge = (d: number) => {
    rotVel.current = THREE.MathUtils.clamp(d * 6, -4, 4);
    swayV.current += d * 0.15;
  };

  return (
    <group ref={group} position={[0, 1.15, 0]}>
      {/* top walnut disc */}
      <mesh>
        <cylinderGeometry args={[1.05, 1.05, 0.14, 40]} />
        <meshStandardMaterial color="#6b4a34" roughness={0.7} />
      </mesh>
      {/* brass ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[1.05, 0.022, 12, 60]} />
        <meshStandardMaterial color="#b08d57" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* hanging loop */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.14, 0.02, 10, 30]} />
        <meshStandardMaterial color="#b08d57" metalness={0.8} roughness={0.3} />
      </mesh>

      {rods.map((r, i) => (
        <Rod key={i} x={r.x} z={r.z} length={r.length} index={i} onRing={onRing} />
      ))}

      {/* center string + car + sail */}
      <group>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 1.3, 6]} />
          <meshStandardMaterial color="#8a7a63" />
        </mesh>
        <group position={[0, -1.45, 0]}>
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.25}>
            <ClassicCar car={car} />
          </Float>
        </group>
        {/* wind sail */}
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 1.3, 6]} />
          <meshStandardMaterial color="#8a7a63" />
        </mesh>
        <mesh position={[0, -3.0, 0]}>
          <boxGeometry args={[0.5, 0.62, 0.03]} />
          <meshStandardMaterial color="#ede4d3" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

export default function ChimeScene({ car, onRing }: { car: CarChoice; onRing: (pitch: number) => void }) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.4], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      onPointerMove={(e) => {
        if (dragging.current) {
          const d = e.clientX - lastX.current;
          lastX.current = e.clientX;
          (ChimeModel as unknown as { nudge: (d: number) => void }).nudge?.(d * 0.01);
        }
      }}
      aria-label="Interactive 3D wind chime — drag to spin, click a rod to ring it"
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#fff2dd" />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#d8c6a8" />
      <spotLight position={[0, 7, 2]} angle={0.5} penumbra={1} intensity={0.8} color="#ffffff" />
      <ChimeModel car={car} onRing={onRing} dragging={dragging} />
      <ContactShadows position={[0, -2.35, 0]} opacity={0.25} scale={8} blur={2.6} color="#2b211c" />
    </Canvas>
  );
}
