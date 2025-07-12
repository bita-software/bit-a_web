'use client';

import { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shader material personalizado para efectos perlados
const PearlMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    mouse: new THREE.Vector2(),
    opacity: 0.15,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float opacity;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Función para efectos perlados
    float pearl(vec2 uv, float time) {
      float angle = atan(uv.y, uv.x);
      float radius = length(uv);
      
      // Ondas concéntricas
      float wave1 = sin(radius * 8.0 - time * 1.5) * 0.5 + 0.5;
      float wave2 = sin(radius * 12.0 + time * 2.0) * 0.5 + 0.5;
      
      // Reflejos radiales
      float radial = sin(angle * 3.0 + time * 0.8) * 0.5 + 0.5;
      
      return (wave1 + wave2) * 0.5 * radial;
    }
    
    // Función para ondas fluidas sutiles (inspirada en el estilo proporcionado)
    float fluidWaves(vec2 uv, float time) {
      vec2 p = uv;
      float slowTime = time * 0.3; // Animación mucho más lenta
      
      // Ondas sutiles con menos iteraciones para mantener rendimiento
      for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.08 / i * cos(i * 1.2 * p.y + slowTime);
        p.y += 0.08 / i * cos(i * 0.8 * p.x + slowTime);
      }
      
      // Efecto muy sutil basado en la distorsión
      float effect = 0.02 / abs(sin(slowTime * 0.5 - p.y * 0.5 - p.x * 0.5));
      return clamp(effect, 0.0, 0.3); // Limitar intensidad
    }
    
    void main() {
      vec2 st = vUv * 4.0;
      vec2 pos = st + time * 0.05;
      
      // Ruido base muy sutil
      float n = noise(pos) * 0.3;
      
      // Efecto perlado principal
      vec2 center = vec2(0.5, 0.5);
      vec2 pearlUv = (vUv - center) * 2.0;
      float pearlEffect = pearl(pearlUv, time);
      
      // Ondas fluidas sutiles
      vec2 waveUv = (vUv - center) * 1.5;
      float fluidEffect = fluidWaves(waveUv, time);
      
      // Gradiente radial sutil
      float dist = distance(vUv, center);
      float gradient = 1.0 - smoothstep(0.0, 1.4, dist);
      
      // Efecto de mouse muy sutil
      vec2 mousePos = mouse / resolution;
      float mouseEffect = 1.0 - smoothstep(0.0, 0.5, distance(vUv, mousePos));
      mouseEffect *= 0.3; // Hacer el efecto más sutil
      
      // Shimmer horizontal más sutil
      float shimmer = sin(vUv.x * 6.0 + time * 1.2) * 0.5 + 0.5;
      shimmer *= sin(vUv.y * 4.0 - time * 0.8) * 0.5 + 0.5;
      
      // Color blanco perlado
      vec3 color = vec3(0.973, 0.980, 0.988); // #f8fafc
      
      // Combinar todos los efectos con pesos sutiles
      float alpha = (
        n + 
        pearlEffect * 0.5 + 
        gradient * 0.2 + 
        mouseEffect + 
        shimmer * 0.08 + 
        fluidEffect * 0.4  // Agregar las ondas fluidas sutiles
      ) * opacity;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Extender JSX para incluir nuestro material personalizado
extend({ PearlMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    pearlMaterial: object;
  }
}

function PearlPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock, mouse, size }) => {
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      materialRef.current.uniforms.resolution.value.set(size.width, size.height);
      materialRef.current.uniforms.mouse.value.set(mouse.x * size.width, mouse.y * size.height);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <pearlMaterial ref={materialRef} transparent />
    </mesh>
  );
}

export default function ShaderCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <PearlPlane />
      </Canvas>
    </div>
  );
} 