import { Canvas, useFrame } from "@react-three/fiber";
import { EffectableGltf } from "../lib/EffectableGltf";
import { OutlineEffect } from "../lib/OutlineEffect";
import { OverlayEffect } from "../lib/OverlayEffect";
import { CameraControls } from "@react-three/drei";
import { useEffect, useState } from "react";

function AppCanvas() {
  const [overlayOpacity, setOverlayOpacity] = useState(0.3);
  const [isAscending, setIsAscending] = useState(true);

  const [showEffects, setShowEffects] = useState(true);

  useFrame(() => {
    setOverlayOpacity((prev) => {
      if (isAscending) {
        if (prev >= 1) {
          setIsAscending(false);
          return 0.8;
        }
        return prev + 0.01;
      } else {
        if (prev <= 0) {
          setIsAscending(true);
          return 0.3;
        }
        return prev - 0.01;
      }
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowEffects((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 100, 50]} intensity={0.8} castShadow />

      <gridHelper args={[200, 20, "#888888", "#444444"]} />
      <CameraControls />

      <EffectableGltf
        src={
          "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf"
        }
      >
        {showEffects && (
          <>
            <OutlineEffect color="#0000FF" />
            <OverlayEffect color="red" opacity={overlayOpacity} />
          </>
        )}
      </EffectableGltf>

      <EffectableGltf
        src={
          "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf"
        }
        position={[0, 0, -2]}
      >
        <OutlineEffect color="#0000FF" />
        <OverlayEffect color="red" opacity={1 - overlayOpacity} />
      </EffectableGltf>
    </>
  );
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas>
        <AppCanvas />
      </Canvas>
    </div>
  );
}

export default App;
