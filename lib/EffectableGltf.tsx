import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { Group, Mesh } from "three";
import { useGLTF, type GltfProps } from "@react-three/drei";

interface EffectContextValue {
  root: React.MutableRefObject<Group | null>;
  meshes: Mesh[];
}

const EffectContext = createContext<EffectContextValue | null>(null);

export const useEffectData = () => {
  const ctx = useContext(EffectContext);
  if (!ctx)
    throw new Error("Effect components must be used within <EffectableGltf>");
  return ctx;
};

interface EffectableGltfProps extends Omit<GltfProps, "children"> {
  src: string;
  children?: ReactNode;
}

export const EffectableGltf: FC<EffectableGltfProps> = ({
  src,
  children,
  ...rest
}) => {
  const root = useRef<Group>(null);
  const { scene: originalScene } = useGLTF(src);

  // Clone the scene for this instance
  const scene = useMemo(() => {
    const clonedScene = originalScene.clone();
    // Ensure all materials are cloned as well
    clonedScene.traverse((object) => {
      if (object instanceof Mesh && object.material) {
        object.material = object.material.clone();
      }
    });
    return clonedScene;
  }, [originalScene]);

  const meshes = useMemo<Mesh[]>(() => {
    const out: Mesh[] = [];
    scene.traverse((o) => {
      if ((o as Mesh).isMesh) out.push(o as Mesh);
    });
    return out;
  }, [scene]);

  return (
    <EffectContext.Provider value={{ root, meshes }}>
      <group ref={root} {...rest}>
        <primitive object={scene} />
      </group>
      {children}
    </EffectContext.Provider>
  );
};
