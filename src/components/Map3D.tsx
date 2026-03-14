import { useMemo, useState, useEffect, Suspense, lazy } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Location, Character, locations, gameOrder } from "../data";

const HeavyPostProcessing = lazy(() => import("./HeavyPostProcessing"));

interface Map3DProps {
  selectedCharacter: Character;
  selectedLocation: Location | null;
  onSelectLocation: (loc: Location) => void;
  nostalgiaMode: boolean;
  heavyNostalgiaMode?: boolean;
}

// Sphere dimensions
const RADIUS = 15;

// Convert Lat/Lng to 3D coordinates on the sphere
// Standard spherical coordinate conversion matching Three.js default SphereGeometry UV mapping
const getCoordinates = (lat: number, lng: number, heightOffset = 0) => {
  // Convert latitude and longitude to radians
  // Latitude: -90 (South Pole) to +90 (North Pole) -> phi: PI to 0
  const phi = (90 - lat) * (Math.PI / 180);

  // Longitude: -180 (West) to +180 (East) -> theta: 0 to 2*PI
  // The +90 offset aligns the 0 longitude (Prime Meridian) correctly with the texture
  const theta = (lng + 90) * (Math.PI / 180);

  const r = RADIUS + heightOffset;

  // Standard spherical to Cartesian conversion
  const x = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
};

// Custom shader injection to boost land elevation and flatten sea
const customDisplacementShader = `
#ifdef USE_DISPLACEMENTMAP
  // Read displacement value from texture
  float disp = texture2D( displacementMap, uv ).x;
  
  // Threshold to separate land from sea. 
  // 0.0001 is low enough to catch low-altitude landmasses like parts of Russia/Europe.
  if (disp > 0.0001) {
    disp = 0.05 + disp * 0.6; // Boost land height more for detail
  } else {
    disp = 0.0; // Flatten sea completely
  }
  
  // Apply displacement along the vertex normal
  transformed += normalize( objectNormal ) * ( disp * displacementScale );
#endif
`;

const WorldMap = () => {
  // Using a high-res topology map that covers the entire globe (equirectangular)
  const [displacementMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ]);

  // High density geometry for detailed nodes
  // Increased segments for better elevation detail while maintaining performance
  const geometry = useMemo(
    () => new THREE.SphereGeometry(RADIUS, 360, 180),
    [],
  );

  const solidMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#0a0505", // Dark base color to hide the back
      displacementMap: displacementMap,
      displacementScale: 1.0,
      roughness: 1,
      polygonOffset: true,
      polygonOffsetFactor: 1,
    });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <displacementmap_vertex>",
        customDisplacementShader,
      );
    };
    return mat;
  }, [displacementMap]);

  const wireframeMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#ef4444", // Umbrella Red
      wireframe: true,
      displacementMap: displacementMap,
      displacementScale: 1.0,
      transparent: true,
      opacity: 1.0, // Controlled by fragment shader
    });

    mat.onBeforeCompile = (shader) => {
      // Pass UV to fragment shader for elevation-based opacity
      shader.vertexShader = `
        varying vec2 vUvDisp;
        ${shader.vertexShader}
      `
        .replace(
          "#include <uv_vertex>",
          `#include <uv_vertex>
         vUvDisp = uv;`,
        )
        .replace("#include <displacementmap_vertex>", customDisplacementShader);

      shader.fragmentShader = `
        varying vec2 vUvDisp;
        uniform sampler2D displacementMap;
        ${shader.fragmentShader}
      `.replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
         float disp = texture2D( displacementMap, vUvDisp ).x;
         
         // Fade out near poles to reduce visual clutter
         float poleDist = abs(vUvDisp.y - 0.5) * 2.0;
         float poleFade = smoothstep(0.95, 0.7, poleDist); // 1.0 at equator, 0.0 at poles
         
         if (disp <= 0.0001) {
           gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * 0.02 * poleFade); // Sea wireframe very faint
         } else {
           gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * 0.25 * poleFade); // Land wireframe more visible
         }
        `,
      );
    };
    return mat;
  }, [displacementMap]);

  const pointsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        displacementMap: { value: displacementMap },
        displacementScale: { value: 1.0 },
        color: { value: new THREE.Color("#ef4444") },
      },
      vertexShader: `
        uniform sampler2D displacementMap;
        uniform float displacementScale;
        varying float vElevation;
        varying vec2 vUv;
        
        // Pseudo-random function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vUv = uv;
          float disp = texture2D(displacementMap, uv).x;
          vElevation = disp;
          
          float poleDist = abs(uv.y - 0.5) * 2.0;
          
          if (disp <= 0.0001) {
            // PERFORMANCE FIX: Cull 99% of sea points in vertex shader
            // This prevents the GPU from even rasterizing these points
            if (random(uv) > 0.01) {
              gl_Position = vec4(2.0, 2.0, 2.0, 0.0); // Move outside clip space
              gl_PointSize = 0.0;
              return;
            }
            disp = 0.0;
          } else {
            // Cull some land points near poles to reduce density
            if (poleDist > 0.7 && random(uv + 1.0) < (poleDist - 0.7) * 3.0) {
              gl_Position = vec4(2.0, 2.0, 2.0, 0.0);
              gl_PointSize = 0.0;
              return;
            }
            disp = 0.05 + disp * 0.6;
          }
          
          vec3 transformed = position + normal * (disp * displacementScale);
          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = (vElevation > 0.0001 ? 0.4 : 0.2) * (50.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vElevation;
        varying vec2 vUv;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard; // Circular points
          
          if (vElevation <= 0.0001) {
            gl_FragColor = vec4(color, 0.05); // Make remaining sea nodes very faint
          } else {
            gl_FragColor = vec4(color, 0.8); // Land nodes visible
          }
        }
      `,
      transparent: true,
    });
  }, [displacementMap]);

  return (
    <group>
      <mesh geometry={geometry} material={solidMaterial} />
      <mesh geometry={geometry} material={wireframeMaterial} />
      <points geometry={geometry} material={pointsMaterial} />
    </group>
  );
};

const Marker = ({
  location,
  isSelected,
  isFaded,
  onClick,
  heavyNostalgiaMode,
  children,
}: {
  location: Location;
  isSelected: boolean;
  isFaded: boolean;
  onClick: () => void;
  heavyNostalgiaMode?: boolean;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { pos, quaternion } = useMemo(() => {
    const p = getCoordinates(location.lat, location.lng, 0.4); // Base above highest mountains to prevent clipping
    const n = p.clone().normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      n,
    );
    return { pos: p, quaternion: q };
  }, [location.lat, location.lng]);

  const color = isSelected ? "#ef4444" : isFaded ? "#451a1a" : "#ffffff";
  const height = isSelected ? 2.5 : 1.8;

  return (
    <group
      position={[pos.x, pos.y, pos.z]}
      quaternion={quaternion}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Vertical Line pointing outward from sphere */}
      <Line
        points={[
          [0, -1.0, 0], // Extend deep into the sphere so it always grounds to the terrain
          [0, height, 0],
        ]}
        color={color}
        lineWidth={isSelected ? 3 : 2}
        transparent
        opacity={isFaded ? 0.3 : 0.9}
      />

      {/* Glowing Dot */}
      <mesh position={[0, height, 0]}>
        <sphereGeometry args={[isSelected ? 0.2 : 0.12, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isFaded ? 0.3 : 1}
        />
      </mesh>

      {/* Label */}
      {!isFaded && (
        <Html
          position={[0, height + 0.4, 0]}
          center
          className="pointer-events-none z-10"
          zIndexRange={[0, 10]}
          occlude
        >
          <div
            className={`
            text-[10px] font-mono font-bold px-2 py-1 rounded whitespace-nowrap backdrop-blur-md transition-all duration-300
            ${heavyNostalgiaMode ? "font-pixel" : ""}
            ${
              isSelected
                ? "bg-red-950/90 border border-red-500 text-red-400 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                : "bg-[#1a1515]/80 border border-red-900/50 text-slate-300"
            }
          `}
          >
            {t(`locations.${location.id}.name`, location.name)}
          </div>
        </Html>
      )}

      {children}
    </group>
  );
};

const AnimatedPath = ({
  points,
  color,
}: {
  points: THREE.Vector3[];
  color: string;
}) => {
  if (points.length < 2) return null;

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={3}
        transparent
        opacity={0.8}
      />
    </group>
  );
};

const CameraFocus = ({
  selectedLocation,
}: {
  selectedLocation: Location | null;
}) => {
  const { camera, controls } = useThree();
  const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // When selectedLocation changes, set a new target position
  useEffect(() => {
    if (selectedLocation) {
      const rawPos = getCoordinates(
        selectedLocation.lat,
        selectedLocation.lng,
        0,
      );
      // Apply the rotation of the group containing the map
      const worldPos = rawPos
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

      const cameraDistance = 35;
      // Position the camera along the vector from center to the location, scaled to distance
      const newCameraPos = worldPos
        .clone()
        .normalize()
        .multiplyScalar(cameraDistance);

      setTargetPos(newCameraPos);
      setIsAnimating(true);
    }
  }, [selectedLocation]);

  useFrame((state, delta) => {
    if (!controls) return;

    const orbitControls = controls as unknown as {
      update: () => void;
      object: THREE.Camera;
      target: THREE.Vector3;
      enableDamping: boolean;
      enabled: boolean;
    };

    if (isAnimating && targetPos) {
      // Disable controls while animating to prevent conflict
      orbitControls.enabled = false;

      // Smoothly interpolate camera position
      camera.position.lerp(targetPos, 0.05); // Reduced speed (was 0.1)
      camera.lookAt(0, 0, 0); // Ensure looking at center

      // Ensure controls target stays at center (0,0,0)
      orbitControls.target.set(0, 0, 0);

      // Stop animating when close enough
      if (camera.position.distanceTo(targetPos) < 0.5) {
        setIsAnimating(false);
        orbitControls.enabled = true; // Re-enable controls
      }
    } else {
      orbitControls.enabled = true;
    }

    orbitControls.update();
  });

  return null;
};

export default function Map3D({
  selectedCharacter,
  selectedLocation,
  onSelectLocation,
  nostalgiaMode,
  heavyNostalgiaMode,
}: Map3DProps) {
  const activeLocations = useMemo(() => {
    if (selectedCharacter === "All") return locations;
    return locations.filter((loc) =>
      loc.characters.includes(selectedCharacter),
    );
  }, [selectedCharacter]);

  const sortedActiveLocations = useMemo(() => {
    const getEarliestGameIndex = (loc: Location) => {
      let minIndex = Infinity;
      loc.games.forEach((g) => {
        const idx = gameOrder.indexOf(g);
        if (idx !== -1 && idx < minIndex) minIndex = idx;
      });
      return minIndex;
    };
    return [...activeLocations].sort(
      (a, b) => getEarliestGameIndex(a) - getEarliestGameIndex(b),
    );
  }, [activeLocations]);

  // Generate the full path points once when locations change
  const pathPoints = useMemo(() => {
    if (sortedActiveLocations.length < 2) return [];
    const points = [];
    for (let i = 0; i < sortedActiveLocations.length - 1; i++) {
      const loc1 = sortedActiveLocations[i];
      const loc2 = sortedActiveLocations[i + 1];

      const p1 = getCoordinates(loc1.lat, loc1.lng, 1.0);
      const p2 = getCoordinates(loc2.lat, loc2.lng, 1.0);

      const segments = 50;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const interpolatedPoint = new THREE.Vector3().copy(p1).lerp(p2, t);
        const arcHeight = Math.sin(t * Math.PI) * 2.0;
        interpolatedPoint.normalize().multiplyScalar(RADIUS + 1.0 + arcHeight);
        points.push(interpolatedPoint);
      }
    }
    return points;
  }, [sortedActiveLocations]);

  return (
    <div className="w-full h-full absolute inset-0 bg-[#1a1515]">
      <Canvas 
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 35], fov: 45 }} 
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#1a1515"]} />
        <fog attach="fog" args={["#1a1515", 30, 80]} />

        <CameraFocus selectedLocation={selectedLocation} />

        {/* Strong ambient light for uniform lighting everywhere on the sphere */}
        <ambientLight intensity={2.5} />

        <group rotation={[0, Math.PI / 2, 0]}>
          <Suspense fallback={null}>
            <WorldMap />
          </Suspense>

          {locations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const isFaded =
              selectedCharacter !== "All" &&
              !loc.characters.includes(selectedCharacter);

            // Calculate index for this location in the current path
            const pathIndex = sortedActiveLocations.findIndex(
              (l) => l.id === loc.id,
            );
            // Show number only if character is selected and location is in path
            const showNumber = selectedCharacter !== "All" && pathIndex !== -1;

            return (
              <Marker
                key={loc.id}
                location={loc}
                isSelected={isSelected}
                isFaded={isFaded}
                onClick={() => onSelectLocation(loc)}
                heavyNostalgiaMode={heavyNostalgiaMode}
              >
                {showNumber && (
                  <Html
                    position={[0, 3.2, 0]}
                    center
                    className="pointer-events-none z-20"
                    occlude
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[11px] font-black border-2 border-[#1a1515] shadow-[0_0_15px_rgba(220,38,38,0.9)] ${heavyNostalgiaMode ? "font-pixel" : ""}`}
                    >
                      {pathIndex + 1}
                    </motion.div>
                  </Html>
                )}
              </Marker>
            );
          })}

          {selectedCharacter !== "All" && pathPoints.length > 0 && (
            <AnimatedPath points={pathPoints} color="#ef4444" />
          )}
        </group>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={20}
          maxDistance={60}
          target={[0, 0, 0]}
        />

        {nostalgiaMode && heavyNostalgiaMode && (
          <Suspense fallback={null}>
            <HeavyPostProcessing />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}
