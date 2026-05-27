import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff4500" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Cube />
      <OrbitControls />
    </>
  );
}
