import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useCallback } from "react";
import { Vector2, Color } from "three";
import './scene.css';

import vertexShader from './glsl/vertexShader';
import fragmentShader from './glsl/fragmentShader';

const Gradient = () => {
    // This reference will give us direct access to the mesh
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  // const updateMousePosition = useCallback((e) => {
  //   mousePosition.current = { x: e.pageX, y: e.pageY };
  // }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#dbe9f9"),
        // value: new Color("##A1A3F7"),

      },
      u_colorA: { value: new Color("#c9def4") },
      u_colorB: { value: new Color("#60efff") },
      u_colorC: { value: new Color("#92DCE5") },
      // u_colorA: { value: new Color("##9FBAF9") },
      // u_colorB: { value: new Color("##CAEDFF") },
      // u_colorC: { value: new Color("##C6FFDD") },
    }),
    []
  );

  // useEffect(() => {
  //   window.addEventListener("mousemove", updateMousePosition, false);

  //   return () => {
  //     window.removeEventListener("mousemove", updateMousePosition, false);
  //   };
  // }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={6.0}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 1.5] }}>
      <Gradient />
    </Canvas>
  );
};

export default Scene;
