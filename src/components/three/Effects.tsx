'use client';

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

const chromaticOffset = new Vector2(0.001, 0.001);

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        intensity={0.7}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.15}
      />
      <Vignette darkness={0.7} offset={0.3} />
      <ChromaticAberration offset={chromaticOffset} />
    </EffectComposer>
  );
}
