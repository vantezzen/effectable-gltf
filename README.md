# effectable-gltf

A simple effects system for glTF models in React Three Fiber. This library provides a drop-in replacement for `@react-three/drei`'s `Gltf` component with the ability to add visual effects to your 3D models.

## Features

- Drop-in replacement for `@react-three/drei`'s `Gltf` component
- Two built-in effects:
  - `Overlay`: Add color overlays with customizable opacity
  - `Outline`: Add cartoon-style outlines to your models
- TypeScript support
- Built on top of React Three Fiber

## Installation

```bash
npm install @vantezzen/effectable-gltf
# or
yarn add @vantezzen/effectable-gltf
# or
pnpm add @vantezzen/effectable-gltf
```

## Quick Start

```tsx
import {
  EffectableGltf,
  OverlayEffect,
  OutlineEffect,
} from "@vantezzen/effectable-gltf";

function MyScene() {
  return (
    <EffectableGltf src="/path/to/model.gltf">
      <OverlayEffect color="red" opacity={0.5} />
      <OutlineEffect color="black" />
    </EffectableGltf>
  );
}
```

## Documentation

For detailed documentation, visit our [documentation site](https://vantezzen.github.io/effectable-gltf).

## License

MIT
