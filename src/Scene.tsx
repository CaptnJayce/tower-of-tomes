import { OrbitControls } from "@react-three/drei";

function Disc() {
  return (
    <mesh rotation={[-Math.PI / 0.5, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.02, 64]} />
      <meshStandardMaterial color="#f5f5f0" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1} />
      <Disc />
      <OrbitControls />
    </>
  );
}
