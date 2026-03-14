import {
  EffectComposer,
  Scanline,
  Noise,
  Vignette,
  ChromaticAberration,
  Bloom,
  Pixelation,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export default function HeavyEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.5}
        opacity={0.5}
      />
      <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.3} />
      <Vignette eskil={false} offset={0.2} darkness={1.2} />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.003, 0.003)}
      />
      <Pixelation granularity={3} />
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={1.5}
      />
      <Glitch
        delay={new Vector2(1.5, 3.5)}
        duration={new Vector2(0.1, 0.3)}
        strength={new Vector2(0.1, 0.5)}
        active
        ratio={0.15}
      />
    </EffectComposer>
  );
}
