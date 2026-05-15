"use client";

import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { AdditiveBlending, CatmullRomCurve3, Vector3 } from "three";

function SolarRows() {
  const panels = useMemo(() => {
    const items: Array<{ x: number; z: number }> = [];
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 9; column += 1) {
        items.push({ x: column * 1.35 - 5.4, z: row * 1.1 - 3.3 });
      }
    }
    return items;
  }, []);

  return (
    <group rotation={[0, -0.18, 0]}>
      {panels.map((panel) => (
        <group key={`${panel.x}-${panel.z}`} position={[panel.x, 0.25, panel.z]} rotation={[-0.55, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.05, 0.04, 0.62]} />
            <meshStandardMaterial color="#0c1724" metalness={0.45} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0.026, 0]}>
            <boxGeometry args={[0.98, 0.012, 0.55]} />
            <meshStandardMaterial color="#172c40" emissive="#0b2440" emissiveIntensity={0.25} metalness={0.7} roughness={0.18} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BatteryContainers() {
  return (
    <group position={[4.6, 0.35, 2.4]} rotation={[0, -0.18, 0]}>
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[0, 0, item * 0.82]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.7, 0.58]} />
          <meshStandardMaterial color="#d8ddd7" metalness={0.2} roughness={0.45} />
        </mesh>
      ))}
      {[0, 1, 2].map((item) => (
        <mesh key={`door-${item}`} position={[-0.96, 0.02, item * 0.82]}>
          <boxGeometry args={[0.02, 0.46, 0.32]} />
          <meshStandardMaterial color="#aab3ad" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function GridConnection() {
  return (
    <group position={[3.9, 0.1, -2.8]}>
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <boxGeometry args={[1.8, 0.16, 1.2]} />
        <meshStandardMaterial color="#1a2428" roughness={0.5} />
      </mesh>
      {[-0.55, 0, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.95, 12]} />
          <meshStandardMaterial color="#b8c4bd" metalness={0.6} roughness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[1.45, 0.05, 0.08]} />
        <meshStandardMaterial color="#c6d0c8" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0.9, 0.42, 0.24]} castShadow>
        <boxGeometry args={[0.42, 0.48, 0.38]} />
        <meshStandardMaterial color="#718078" roughness={0.42} />
      </mesh>
    </group>
  );
}

function EnergyLines() {
  const group = useRef<Group>(null);
  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-4.8, 0.22, -2.2),
        new Vector3(-1.5, 0.58, -1.4),
        new Vector3(1.4, 0.7, 0.1),
        new Vector3(4.0, 0.78, -2.2),
      ]),
    [],
  );

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[curve, 80, 0.012, 8, false]} />
        <meshBasicMaterial color="#b7ffe1" transparent opacity={0.55} blending={AdditiveBlending} />
      </mesh>
      <mesh position={[4, 0.78, -2.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#d9fff0" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function SceneRig() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.035;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 12, 1, 1]} />
        <meshStandardMaterial color="#111713" roughness={0.82} />
      </mesh>
      <SolarRows />
      <BatteryContainers />
      <GridConnection />
      <EnergyLines />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <mesh position={[-5.1, 1.4, 3.2]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshBasicMaterial color="#eafff7" transparent opacity={0.75} />
        </mesh>
      </Float>
    </group>
  );
}

export default function EnergyScene() {
  return (
    <Canvas camera={{ position: [6.8, 5.1, 7.2], fov: 42 }} shadows dpr={[1, 1.7]}>
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 8, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 6, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, 3]} color="#9fffd5" intensity={1.2} />
      <SceneRig />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.22} maxPolarAngle={Math.PI / 2.15} minPolarAngle={Math.PI / 3.2} />
    </Canvas>
  );
}
