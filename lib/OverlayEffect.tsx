import { type FC, useEffect, useRef } from "react";
import { type ColorRepresentation, Mesh, MeshStandardMaterial } from "three";
import { useEffectData } from "./EffectableGltf";

interface OverlayEffectProps {
  color: ColorRepresentation;
  opacity?: number;
}

export const OverlayEffect: FC<OverlayEffectProps> = ({
  color,
  opacity = 0.5,
}) => {
  const { meshes } = useEffectData();
  const clonesRef = useRef<Mesh[]>([]);

  // mount clones once
  useEffect(() => {
    const clones: Mesh[] = [];

    meshes.forEach((mesh) => {
      const clone = mesh.clone() as Mesh;
      const mat = (clone.material as MeshStandardMaterial).clone();

      mat.color.set(color);
      mat.transparent = true;
      mat.opacity = opacity;
      mat.depthWrite = false;

      clone.material = mat;
      clone.raycast = () => null;

      (mesh.parent ?? mesh).add(clone);
      clones.push(clone);
    });

    clonesRef.current = clones;

    return () => {
      clones.forEach((c) => {
        c.parent?.remove(c);
        (c.material as MeshStandardMaterial).dispose();
      });
      clonesRef.current = [];
    };
  }, [meshes]);

  // react to prop changes
  useEffect(() => {
    clonesRef.current.forEach((c) => {
      const mat = c.material as MeshStandardMaterial;
      mat.color.set(color);
      mat.opacity = opacity;
      mat.needsUpdate = true;
    });
  }, [color, opacity]);

  return null;
};
