"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function StarPoints() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 950;
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#f5efe2"),
      new THREE.Color("#d7a85c"),
      new THREE.Color("#8fb9aa"),
      new THREE.Color("#b7cad2")
    ];

    for (let index = 0; index < count; index += 1) {
      const radius = 5 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const stride = index * 3;
      const color = palette[Math.floor(Math.random() * palette.length)];

      positionArray[stride] = radius * Math.sin(phi) * Math.cos(theta);
      positionArray[stride + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positionArray[stride + 2] = radius * Math.cos(phi);

      colorArray[stride] = color.r;
      colorArray[stride + 1] = color.g;
      colorArray[stride + 2] = color.b;
    }

    return { positions: positionArray, colors: colorArray };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.86}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Starfield() {
  const fog = useMemo(() => new THREE.Fog("#0d1011", 9, 26), []);

  return (
    <div className="starfield" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <color attach="background" args={["#0d1011"]} />
        <primitive object={fog} attach="fog" />
        <StarPoints />
      </Canvas>
    </div>
  );
}
