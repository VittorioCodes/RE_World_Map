import React from "react";
import { EffectComposer, Scanline, Noise, Vignette, ChromaticAberration, Pixelation, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function HeavyPostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.5}
        opacity={0.25}
      />
      <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.1} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.002, 0.002]}
      />
      <Pixelation granularity={3} />
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={300}
        opacity={0.2}
      />
    </EffectComposer>
  );
}
