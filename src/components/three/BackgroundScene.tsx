'use client';

import { Canvas } from '@react-three/fiber';
import AudioMesh from './AudioMesh';
import Effects from './Effects';

export default function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <AudioMesh />
      <Effects />
    </Canvas>
  );
}
