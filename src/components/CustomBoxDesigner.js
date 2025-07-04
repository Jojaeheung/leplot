import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../styles/CustomBoxDesigner.css';

// Temporary placeholder mesh for the dessert box.
const RotatingBox = () => {
  const meshRef = useRef();

  // Rotate the box every frame.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f5deb3" wireframe={false} />
    </mesh>
  );
};

const CustomBoxDesigner = () => {
  return (
    <section className="designer-wrapper">
      <h2 className="designer-title">나만의 디저트 박스 만들기 (Beta)</h2>
      <div className="designer-canvas-container">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

          {/* Placeholder 3D object */}
          <RotatingBox />

          {/* Allow user to orbit around the scene */}
          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
      </div>
      <p className="designer-hint">디저트를 드래그하여 상자에 담아보세요! (개발 중)</p>
    </section>
  );
};

export default CustomBoxDesigner;