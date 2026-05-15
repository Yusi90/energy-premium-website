"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { AdditiveBlending, CatmullRomCurve3, Vector3 } from "three";

const panelRows = Array.from({ length: 6 }, (_, row) => row);
const panelColumns = Array.from({ length: 8 }, (_, column) => column);

function SolarField() {
  return (
    <group position={[-1.7, 0.05, 0.35]} rotation={[0, -0.24, 0]}>
      {panelRows.map((row) =>
        panelColumns.map((column) => (
          <group key={`${row}-${column}`} position={[column * 1.12 - 4.1, 0.28, row * 0.86 - 2.15]} rotation={[-0.47, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.94, 0.035, 0.5]} />
              <meshStandardMaterial color="#182f38" metalness={0.5} roughness={0.26} />
            </mesh>
            <mesh position={[0, 0.023, 0]}>
              <boxGeometry args={[0.86, 0.01, 0.43]} />
              <meshStandardMaterial color="#203f4a" emissive="#102a2d" emissiveIntensity={0.18} metalness={0.65} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.22, 0.18]} rotation={[0.47, 0, 0]}>
              <boxGeometry args={[0.035, 0.42, 0.035]} />
              <meshStandardMaterial color="#9a9589" metalness={0.35} roughness={0.55} />
            </mesh>
          </group>
        )),
      )}
    </group>
  );
}

function StoragePark() {
  return (
    <group position={[3.55, 0.42, 1.55]} rotation={[0, -0.2, 0]}>
      {[0, 1, 2].map((item) => (
        <group key={item} position={[0, 0, item * 0.78]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.55, 0.62, 0.5]} />
            <meshStandardMaterial color="#dcd6c7" metalness={0.16} roughness={0.44} />
          </mesh>
          <mesh position={[-0.79, 0.02, 0]}>
            <boxGeometry args={[0.018, 0.42, 0.27]} />
            <meshStandardMaterial color="#a8aa9e" roughness={0.52} />
          </mesh>
          <mesh position={[0, 0.33, 0]}>
            <boxGeometry args={[1.6, 0.025, 0.54]} />
            <meshStandardMaterial color="#f2e9d6" roughness={0.38} />
          </mesh>
        </group>
      ))}
      <mesh position={[0.1, -0.34, 0.78]} receiveShadow>
        <boxGeometry args={[2.1, 0.08, 2.25]} />
        <meshStandardMaterial color="#21342b" roughness={0.72} />
      </mesh>
    </group>
  );
}

function Substation() {
  return (
    <group position={[3.45, 0.12, -2.35]} rotation={[0, 0.14, 0]}>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[1.75, 0.14, 1.15]} />
        <meshStandardMaterial color="#22352d" roughness={0.6} />
      </mesh>
      {[-0.55, 0, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.58, 0]} castShadow>
          <cylinderGeometry args={[0.026, 0.026, 0.9, 12]} />
          <meshStandardMaterial color="#c9c2b2" metalness={0.45} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[0, 1.04, 0]}>
        <boxGeometry args={[1.38, 0.045, 0.07]} />
        <meshStandardMaterial color="#d6cfbe" metalness={0.45} roughness={0.32} />
      </mesh>
      <mesh position={[0.75, 0.36, 0.26]} castShadow>
        <boxGeometry args={[0.34, 0.4, 0.34]} />
        <meshStandardMaterial color="#7f897f" roughness={0.46} />
      </mesh>
    </group>
  );
}

function FlowLines() {
  const particleOne = useRef<Mesh>(null);
  const particleTwo = useRef<Mesh>(null);
  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-4.8, 0.36, -1.62),
        new Vector3(-2.3, 0.54, -1.05),
        new Vector3(0.1, 0.62, -0.25),
        new Vector3(2.2, 0.72, -0.9),
        new Vector3(3.55, 0.82, -2.02),
      ]),
    [],
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime * 0.075;
    const first = curve.getPoint(elapsed % 1);
    const second = curve.getPoint((elapsed + 0.46) % 1);
    particleOne.current?.position.copy(first);
    particleTwo.current?.position.copy(second);
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 90, 0.01, 8, false]} />
        <meshBasicMaterial color="#d6a84f" transparent opacity={0.34} blending={AdditiveBlending} />
      </mesh>
      <mesh ref={particleOne}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#f3d99a" transparent opacity={0.82} />
      </mesh>
      <mesh ref={particleTwo}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#7bc7b5" transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

function Landscape() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 9, 1, 1]} />
        <meshStandardMaterial color="#16251e" roughness={0.86} />
      </mesh>
      <mesh position={[-4.8, 0.03, 3.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.2, 1.2, 1, 1]} />
        <meshStandardMaterial color="#28372a" roughness={0.9} />
      </mesh>
      <mesh position={[1.55, 0.04, 3.2]} rotation={[-Math.PI / 2, 0.12, 0]} receiveShadow>
        <planeGeometry args={[5.4, 0.38, 1, 1]} />
        <meshStandardMaterial color="#c3a160" roughness={0.82} />
      </mesh>
    </group>
  );
}

function SceneRig() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.032;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.025;
    }
  });

  return (
    <group ref={group}>
      <Landscape />
      <SolarField />
      <StoragePark />
      <Substation />
      <FlowLines />
    </group>
  );
}

export default function EnergyScene() {
  return (
    <Canvas camera={{ position: [6.2, 4.65, 6.5], fov: 39 }} shadows dpr={[1, 1.65]}>
      <color attach="background" args={["#07130f"]} />
      <fog attach="fog" args={["#07130f", 8, 16]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[3.5, 6, 4]} intensity={2.35} color="#f6dfaa" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 2.2, 2.5]} color="#7bc7b5" intensity={0.75} />
      <SceneRig />
      <Environment preset="city" environmentIntensity={0.42} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.18} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3.4} />
    </Canvas>
  );
}
