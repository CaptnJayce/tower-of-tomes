import { OrbitControls, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ELEMENTS } from "./types/sigils";

function Disc() {
  return (
    <mesh>
      <cylinderGeometry args={[1.5, 1.5, 0.02, 64]} />
      <meshStandardMaterial color="#f5f5f0" />
    </mesh>
  );
}

function Sigil({ image }: { image: string }) {
  const texture = useTexture(image);
  texture.flipY = false;

  return (
    <mesh position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.25, 1.25]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

function CameraInfo() {
  useFrame(({ camera }) => {
    const el = document.getElementById("camera-debug");
    if (el) {
      const px = camera.position.x.toFixed(2);
      const py = camera.position.y.toFixed(2);
      const pz = camera.position.z.toFixed(2);
      const rx = ((camera.rotation.x * 180) / Math.PI).toFixed(1);
      const ry = ((camera.rotation.y * 180) / Math.PI).toFixed(1);
      const rz = ((camera.rotation.z * 180) / Math.PI).toFixed(1);
      el.textContent = `pos: [${px}, ${py}, ${pz}]  |  rot: [${rx}°, ${ry}°, ${rz}°]`;
    }
  });
  return null;
}

export default function Scene({
  currentSpell,
}: {
  currentSpell: string | null;
}) {
  const currentElement = useMemo(
    () => ELEMENTS.find((el) => el.name === currentSpell),
    [currentSpell],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, -2, 4]} intensity={1} />

      <group rotation={[Math.PI / 2, 0, 0]}>
        <Disc />
        {currentElement && <Sigil image={currentElement.image} />}
      </group>

      <OrbitControls />
      <CameraInfo />

      <axesHelper args={[3]} />
    </>
  );
}
