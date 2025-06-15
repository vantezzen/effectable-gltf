# effectable-gltf

A powerful and extensible effects system for glTF models in React Three Fiber. This library allows you to easily apply and customize various visual effects to your 3D models.

## Features

- Drop-in replacement for `@react-three/drei`'s `Gltf` component
- Built-in effects:
  - `Overlay`: Add color overlays with customizable opacity
  - `Outline`: Add cartoon-style outlines to your models
- Extensible architecture for creating custom effects
- TypeScript support
- Built on top of React Three Fiber

## Installation

```bash
npm install effectable-gltf
# or
yarn add effectable-gltf
# or
pnpm add effectable-gltf
```

## Quick Start

```tsx
import { EffectableGltf, Overlay, Outline } from "@vantezzen/effectable-gltf";

function MyScene() {
  return (
    <EffectableGltf src="/path/to/model.gltf">
      <Overlay color="red" opacity={0.5} />
      <Outline />
    </EffectableGltf>
  );
}
```

## Documentation

For detailed documentation, visit our [documentation site](https://vantezzen.github.io/effectable-gltf).

## License

MIT
